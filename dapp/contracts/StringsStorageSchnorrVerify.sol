// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract StringsStorageSchnorrVerify {

    mapping(address=>bool) registered;
    mapping(address=>SchnorrPk) pks;
    mapping(address => string[]) public strings;
    mapping(address => uint) public stringCount;

    event AccountRegistered(address owner, SchnorrPk pk);
    event StringsAdded(address owner, string[] strs, uint count);

    struct SchnorrPk {
        bytes32 first_32;
        bytes1 last_1;
    }

    struct SchnorrSig {
        bytes32[2] b;
    }

    struct SchnorrMessage {
        string message;
        SchnorrSig sig;
    }

    function register(SchnorrPk memory pk) public onlyNewAccount() {
        registered[msg.sender] = true;
        pks[msg.sender] = pk;
        emit AccountRegistered(msg.sender, pk);
    }

    function add(SchnorrMessage memory schnorrMessage) public {
        SchnorrMessage[] memory vArr = new SchnorrMessage[](1);
        vArr[0].message = schnorrMessage.message;
        vArr[0].sig = schnorrMessage.sig;
        _add(vArr);
    }

    function addMany(SchnorrMessage[] memory v) public {
        _add(v);
    }

    function _add(SchnorrMessage[] memory v) private onlyRegistered() {
        SchnorrPk memory pk = pks[msg.sender];
        stringCount[msg.sender] += v.length;
        for (uint i = 0; i < v.length; i++) {
            strings[msg.sender].push(v[i].message);
            bool valid = schnorr(pk, v[i].sig, v[i].message);
            require(valid, "Invalid signature");
        }
        emit StringsAdded(msg.sender, _exctractMessages(v), stringCount[msg.sender]);
    }

    function _exctractMessages(SchnorrMessage[] memory schnorrMessages) private pure returns(string[] memory) {
        string[] memory messages = new string[](schnorrMessages.length);
        for (uint i = 0; i < schnorrMessages.length; i++) {
            messages[i] = schnorrMessages[i].message;
        }
        return messages;
    }

    function schnorr(SchnorrPk memory pk, SchnorrSig memory sig, string memory message) public view returns (bool) {
        bytes memory args = abi.encodePacked(pk.first_32, pk.last_1, sig.b[0], sig.b[1], abi.encodePacked(message));
        uint arg_len = args.length;
        bytes32[2] memory output;
        bool err = false;
        assembly {
            if iszero(staticcall(not(0), 0x0a, add(args, 32), arg_len, output, 0x01)) {
                err := 1
            }
        }
        return !err && output[0] == hex"01";
    }

    function get() public view returns (string[] memory) {
        uint c = stringCount[msg.sender];
        string[] memory res = new string[](c);
        for (uint i = 0; i < c; i++) {
            res[i] = strings[msg.sender][i];
        }
        return res;
    }


    modifier onlyRegistered {
        require(registered[msg.sender], "Sender is not registered");
        _;
    }

    modifier onlyNewAccount {
        require(!registered[msg.sender], "Sender is already registered");
        _;
    }

    address owner;
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}
