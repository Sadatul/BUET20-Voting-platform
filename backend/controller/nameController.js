const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllNames(req, res) {
  const { sid, email, isAdmin } = req.user;

  console.log("request made by ", sid);

  const Name = prisma.name;

  console.log("fetching all names...");

  const names = await Name.findMany();

  // console.log(names);

  console.log(req.headers.token);

    return res.json({
        success:true,
        names:names
    });
}

async function castVote(req, res) {
    const Name = prisma.name;
    const User = prisma.user;
  
    const { sid } = req.user; // Extract the user's sid from req.user
  
    const options = req.body.options; // Array of name IDs (UUIDs)
    
    console.log(options);
  
    try {
      // Find the user who is casting the vote by their sid, including their current votes
      const user = await User.findUnique({
        where: { sid: sid },
        include: { votes: true }, // Include the current votes the user has cast
      });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Get the IDs of names the user has already voted for
      const existingVotes = user.votes.map(vote => vote.id);
  
      // Filter out any name IDs from options that the user has already voted for
      const newVotes = options.filter(option => !existingVotes.includes(option));
  
      if (newVotes.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'You have already voted for all these names',
        });
      }
  
      // Fetch the names the user is trying to vote for (only the new votes)
      const namesToVoteFor = await Name.findMany({
        where: {
          id: { in: newVotes }, // Only get names the user hasn't voted for yet
        }
      });
  
      if (namesToVoteFor.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No valid names found for voting',
        });
      }
  
      // Update the user's votes with the new votes
      await prisma.user.update({
        where: { sid: sid },
        data: {
          votes: {
            connect: newVotes.map(id => ({ id })) // Connect only the new votes to the user's votes
          }
        }
      });
  
      return res.status(200).json({
        success: true,
        message: 'Vote successfully cast',
        votedNames: namesToVoteFor.map(name => name.name), // Return the names voted for
      });
  
    } catch (error) {
      console.error('Error casting vote:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error occurred while casting vote',
      });
    }
  }

  async function getVotingResult(req, res) {
    
    const Name = prisma.name;
  
    try {
      // Find all names and count the number of votes (voters) for each name
      const namesWithVotes = await Name.findMany({
        select: {
          id: true,
          name: true,
          meaning: true,
          _count: {
            select: { voters: true } // Count the number of voters (votes) for each name
          }
        },
        orderBy: {
          voters: {
            _count: 'desc' // Sort by the number of votes in descending order
          }
        }
      });
  
      // If no names are found, return an empty result
      if (!namesWithVotes || namesWithVotes.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'No names or votes found',
          data: []
        });
      }
  
      // Format the result to include the vote count for each name
      const result = namesWithVotes.map(name => ({
        id: name.id,
        name: name.name,
        meaning: name.meaning,
        votes: name._count.voters // Use the counted voters as the number of votes
      }));
  
      // Return the sorted result
      return res.status(200).json({
        success: true,
        message: 'Voting results retrieved successfully',
        data: result
      });
  
    } catch (error) {
      console.error('Error retrieving voting results:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error while retrieving voting results',
      });
    }
  }
  

module.exports = {
    getAllNames,
    castVote,
    getVotingResult
}