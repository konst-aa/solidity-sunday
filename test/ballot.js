const helpers = require("../js-helpers/ether-wrappers");

const testBallot = artifacts.require("TestBallot.sol");

// EDGE CASES WILL BE WRITTEN IN THE NEXT FEW DAYS
contract('Ballot', (accounts) => {
    let ballotInstance;
    before(async () => {
        proposals = ["apples", "cats", "dogs"];
        ballotInstance = await testBallot.new(proposals.map((element) => {
            return helpers.createBytes(element);
        }));
    });
    it("initialized properly", async () => {;
        proposalNames = ["apples", "cats", "dogs"];
        proposals = await ballotInstance.getProposals();

        for (let i = 0; i < proposalNames.length; i++) {
            proposalName = proposalNames[i];
            proposal = proposals[i];
            assert.equal(helpers.parseBytes(proposal.name), proposalName, "names converted right");
            assert.equal(proposal.voteCount, 0, "all start with 0 votes");
        }
    });
    it("gives right to vote", async () => {
        await ballotInstance.giveRightToVote(accounts[1], { from: accounts[0] });
        voter = await ballotInstance.voters(accounts[1]);
        assert.equal(voter.weight.toNumber(), 1, "successfully gives right to vote");

        soonToBeVoters = accounts.slice(2, 10);
        await ballotInstance.giveRightToMany(soonToBeVoters, { from: accounts[0] });
        soonToBeVoters.forEach(async (voter) => {
            temp = await ballotInstance.voters(voter);
            assert.equal(temp.weight.toNumber(), 1, "gives right to vote to multiple people");
        });
        // gotta test edge cases
    });
    it("delegates votes", async () => {
        await ballotInstance.delegate(accounts[3], { from: accounts[1] });
        await ballotInstance.delegate(accounts[3], { from: accounts[2] });
        thirdVoter = await ballotInstance.voters(accounts[3]);
        assert.equal(thirdVoter.weight.toNumber(), 3, "1 and 2 delegates votes to 3");

        await ballotInstance.delegate(accounts[4], { from: accounts[3] });
        fourthVoter = await ballotInstance.voters(accounts[4]);
        assert.equal(fourthVoter.weight.toNumber(), 4, "3 dumps its votes on 4");
    });
    it("lets you vote", async () => {
        temp = await ballotInstance.proposals(0);
        await ballotInstance.vote(0, { from: accounts[4] });
        applesProposal = await ballotInstance.proposals(0);
        assert.equal(applesProposal.voteCount.toNumber(), 4, "4 successfully votes");
    });
    // mentioned in this issue:
    // https://github.com/ethereum/solidity/issues/12478
    it("handles winning and ties", async () => {
        //testing ties
        accounts.slice(5, 9).forEach(async (voter) => {
            await ballotInstance.vote(1, { from: voter }); 
        });
        await ballotInstance.lock({ from: accounts[0] });
        tied = await ballotInstance.getTied();
        assert.equal(tied.length, 2, "There is a tie happening!")

        await ballotInstance.vote(0, { from: accounts[0] });
        winner = await ballotInstance.winnerName();
        assert.equal(helpers.parseBytes(winner), "apples", "apples wins");
    });
});