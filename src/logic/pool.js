const Poll=require('../schema/pollSchema')

exports.Addpooldata=async(req,res)=>{
    const { question, options } = req.body;

  try {
    const newPoll = new Poll({
      question,
      options: options,
    });

    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    console.error(err);
    res.status(500).json('Failed to create a poll.');
  }
}

exports.Pools = async (req, res) => {
  const { pollId, optionIndex } = req.params;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json('Poll not found');
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    // Broadcast the updated votes to all connected clients
    req.app.locals.io.emit('pollUpdate', { pollId, optionIndex, votes: poll.options[optionIndex].votes });
    
    res.status(200).json(poll);
    
  } catch (err) {
    console.error(err);
    res.status(500).json('Failed to vote on the poll.');
  }
}


exports.poolresult=async(req,res)=>{
    const { pollId } = req.params;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json('Poll not found');
    }

    res.status(200).json(poll);
  } catch (err) {
    console.error(err);
    res.status(500).json('Failed to retrieve poll results.');
  }
}

exports.AllData=async(req,res)=>{
  try{
    const data=await Poll.find()
    if(data){
      return res.status(200).json(data)
    }

  }
  catch(err){
    console.log(err);
  }
}