// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

import "../../contracts/Ballot.sol";

contract TestBallot is Ballot {
    constructor(bytes32[] memory proposalNames) Ballot(proposalNames) {}

    function getProposals() external view returns (Proposal[] memory temp) {
        return proposals;
    }

    function getTied() external view returns (uint256[] memory temp) {
        return tied;
    }
}
