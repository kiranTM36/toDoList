const db = require('../db')

const addTask = (req, res) => {
    const { title, description } = req.body

    const userId = req.user.id

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        })
    }

    const sql = `
        INSERT INTO tasks (userId, title, description)
        VALUES (?, ?, ?)
    `

    db.query(
        sql,
        [userId, title, description || null],
        (err, result) => {
            if (err) {
                console.error("Error:", err)

                return res.status(500).json({
                    message: "Error adding task"
                })
            }

            return res.status(201).json({
                message: "Task Added Successfully",
                taskId: result.insertId
            })
        }
    )
}


const showTasks = (req , res) => {
    try {
        const sql = `
        SELECT t.*,u.* FROM tasks t join users u on t.userId = u.id
`

        db.query(sql , (err , result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }
            if(result.length === 0){
                return res.status(404).json({
                    message : "No Tasks",
                })
            }

            return res.status(200).json({
                    message : "List of Tasks",
                    data : result
                })
        })
    } catch (error) {
        
    }
}

const deleteTask = (req ,res) => {
    try {
        const {id} = req.params

        const sql = `
        DELETE FROM tasks WHERE id=?
        `

        db.query(sql , [id] , (err , result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }

            if(result.affectedRows === 1){
                return res.status(200).json({
                message : "Tasks Deleted Successfully",
                success : ture
            })
        }

        return res.status(200).json({
                message : "failed to Execute Querry",
                success : ture
            })
            
        })
    } catch (error) {
    }
}

const showUserTask = (req , res) => {
    try {
        const sql = `SELECT * FROM tasks WHERE userId=?`

        console.log(req.user);
        

        db.query(sql , [req.user.id] ,(err , result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }

            if(result.length === 0){
                return res.status(404).json({
                    message : "Error",
                })
            }

            return res.status(200).json({
                message : "Success",
                data : result
            })
        })
    } catch (error) {
        
    }
}

const showOtherTask = (req , res) => {
    try {
        
        const id = req.params.id
        
        const sql = `SELECT t.*, u.* FROM tasks t JOIN users u ON t.userId= u.id WHERE userId=?`

        db.query(sql , [id] ,(err , result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }

            if(result.length === 0){
                return res.status(404).json({
                    message : "Error",
                })
            }

            return res.status(200).json({
                message : "Success",
                data : result
            })
        })
    } catch (error) {
        
    }
}

const updateComplete = (req , res) => {
    try {
        const {id} = req.params

        const sql = `UPDATE tasks SET complete = !complete WHERE id = ?`;

        db.query(sql,[id] , (err, result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.status(200).json({
                message: "Task completion status toggled successfully",
                data: result
            });

        })

    } catch (error) {
        
    }
}

const updatePriority = (req, res) => {
    const {id} = req.params

    const sql = `UPDATE tasks set priority = !priority WHERE id=?`

    db.query(sql,[id] , (err, result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.status(200).json({
                message: "Task set to Priority",
                data: result
            });

        })

}

module.exports ={ addTask , showTasks , deleteTask , showUserTask , updateComplete, showOtherTask , updatePriority}