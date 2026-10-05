const db = require('../db')

const addTask = (req , res) => {
    try {
        const {title , description , userId} = req.body

        const sql = `
            INSERT INTO tasks (userId, title, description) VALUES (?,?,?)
        `
        db.query(sql , [ userId, title, description] , (err , result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }

            if(result.length === 0){
                return res.status(404).json({
                    message : "No User Found",
                })
            }

            return res.status(200).json({
                message : "Tasks Added Successfully",
                result 
            })
        })

    } catch (error) {
        
    }
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

module.exports ={ addTask , showTasks , deleteTask}