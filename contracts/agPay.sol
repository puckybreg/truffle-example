pragma solidity ^0.4.21;
contract AgPay {
    address public checker;
    address public worker;
    address[] public addressArray;
    struct pieceEntry {
        address checker;
        address worker;
        bool approvedBychecker;
        bool approvedByworker;
        string pieceCondition;
        string employmentContract;
        uint pieceWeight;
        uint pueceRate;
        uint date;
    }
    // this data is all publicly explorable
    mapping(address => pieceEntry) public pieceEntries;
    //record
   // emit event print(uint )
    event Record(address checker, address worker,bool approvedBychecker, bool approvedByworker,
        string pieceCondition, string employmentContract, uint pieceWeight, uint pueceRate,
        uint date);
        
    function record(address checker, address worker, bool approvedBychecker, bool approvedByworker,
        string pieceCondition, string employmentContract, uint pieceWeight, uint pueceRate,
        uint date) public {
        addressArray.push(msg.sender);
        pieceEntries[msg.sender] = pieceEntry(checker,
        worker,
        approvedBychecker,
        approvedByworker,
        pieceCondition,
        employmentContract,
        pieceWeight,
        pueceRate,
        date);
}
    function getAddresses() view public returns (address[]) {
        return addressArray;
    }
    mapping (address => pieceEntry) public registry;
    
    
    function getPieceEntry(address _address) public view returns (address, address, string, string, uint, uint, uint) {
        return (pieceEntries[_address].checker, pieceEntries[_address].worker,  pieceEntries[_address].pieceCondition, pieceEntries[_address].employmentContract, pieceEntries[_address].pieceWeight, pieceEntries[_address].pueceRate, pieceEntries[_address].date);
    }
    //view fx
}