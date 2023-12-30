import Questions from '../models/questionSchema.js'
import Results from '../models/resultSchema.js'
import questions , { answers} from '../database/data.js'

/**get all questions */
export async function getQuestions (req, res) {
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/**add question */
export async function insertQuestions(req, res) {
    
    try {
        await Questions.insertMany({ questions : questions, answers: answers });
        res.json({ msg: "Data Saved Successfully...!" });
    
    } catch (error) {
        res.json({ error })
    }
}

/**delete question */
export async function dropQuestions(req, res) {
    
    try {
        await Questions.deleteMany();
        res.json({ msg: 'Question deleted successfully....' })
    } catch (error) {
        res.json({ error })
    }
}

/**get all result */
export async function getResult(req, res) {
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username || !result) {
            throw new Error('Username or Result not provided...!');
        }
    
        await Results.create({ username, result, attempts, points, achived });
        res.json({ msg: "Result Saved Successfully...!" });
    } catch (error) {
        res.json({ error: error.message });
    }
}

export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}