# Support setting various labels on the final image
ARG COMMIT=""
ARG VERSION=""
ARG BUILDNUM=""

# Build Geth in a stock Go builder container
FROM golang:1.21-alpine as builder

RUN apk add --no-cache gcc musl-dev linux-headers git

# Get dependencies - will also be cached if we won't change go.mod/go.sum
ADD go-ethereum /go-ethereum
RUN cd /go-ethereum && go mod download
RUN cd /go-ethereum && go run build/ci.go install -static ./cmd/geth
RUN cd /go-ethereum && go run build/ci.go install -static ./cmd/bootnode

# Pull Geth into a second stage deploy alpine container
FROM alpine:latest

RUN apk add --no-cache ca-certificates
COPY --from=builder /go-ethereum/build/bin/geth /usr/local/bin/
COPY --from=builder /go-ethereum/build/bin/bootnode /usr/local/bin/

COPY network /network
WORKDIR /network
# RUN ["chmod", "+x", "/network/install.sh"]
# COPY sample /sample/
# COPY install.sh /install.sh
# COPY stop.sh /stop.sh
# COPY clean.sh /clean.sh

EXPOSE 8545 8546 30303 30303/udp
WORKDIR /network

# Add some metadata labels to help programatic image consumption
ARG COMMIT=""
ARG VERSION=""
ARG BUILDNUM=""

LABEL commit="$COMMIT" version="$VERSION" buildnum="$BUILDNUM"
