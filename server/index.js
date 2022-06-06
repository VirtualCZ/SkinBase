const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "skinbase"
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.delete("/api/sell/:IDOwner/:IDItem", (req, res) =>{
    const DelOwnerID = req.params.IDOwner
    const DelItemID = req.params.IDItem
    const negativeAmount = -1   
    const sqlSellDelete =
        "call pInventory_update(?, ?, ?)"
        db.query(sqlSellDelete, [DelOwnerID, DelItemID, negativeAmount], (err, result) => {
            if (err) console.log(err)
        })
})

app.post("/api/insertItem", (req, res) => {
    const IDItem = parseInt(req.body.idItem)
    var UserID = parseInt(req.body.userID)
    const sqlSelect =
        "call pInventory_update(?, ?, 1)"
    db.query(sqlSelect, [UserID, IDItem], (err, result)=> {
        console.log(err)
        console.log(result)
    });
})

app.get("/api/getItemsBySkinID/:skinid", (req, res) => {
    const skinID = req.params.skinid
    const sqlSelect =
        "call getItemsBySkin_select(?) "
    db.query(sqlSelect, skinID, (err, result)=> {
        //console.log(err)
        res.send(result[0])
    });
})

app.get("/api/getItemsByType/:type", (req, res) => {
    const type = req.params.type
    const sqlSelect =
        "call pItemsByType_select (?) "
    db.query(sqlSelect, type, (err, result)=> {
        //console.log(err)
        res.send(result[0])
    });
})

app.get("/api/getCaseContent/:casename", (req, res) => {
    const casename = req.params.casename.replace("_", " ").replace("_", " ")
    const sqlSelect =
        "call pCaseContent_select(?) "
    db.query(sqlSelect, casename, (err, result)=> {
        //console.log(err)
        res.send(result[0])
    });
})

app.get("/api/getCases", (req, res) => {
    const sql =
        "call pCases_select() "
    db.query(sql, (err, result)=> {
        //console.log(err)
        res.send(result[0])
    });
})

app.get("/api/getCase/:casename", (req, res) => {
    const casename = req.params.casename.replace("_", " ").replace("_", " ")
    const sql =
        "call pCase_select(?) "
    db.query(sql, casename, (err, result)=> {
        //console.log(err)
        res.send(result[0])
    });
})

app.listen(3030, ()=> {
    console.log("running on port 3030");
})  