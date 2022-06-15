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

// UPDATES
app.put("/api/updateItem", (req, res) => {
    const newprice = req.body.newprice
    const iditem = req.body.iditem
    const skinname = req.body.skinname
    const idskin = req.body.idskin

    const sqlUpdatePrice =
        "call pItem_update(?, ?)"
    db.query(sqlUpdatePrice, [newprice, iditem], (err, result)=> {
        if (err) console.log(err)
    });
    const sqlUpdateName =
        "call pSkin_update(?, ?)"
    db.query(sqlUpdateName, [skinname, idskin], (err, result)=> {
        if (err) console.log(err)
    });
})

// DELETES
app.delete("/api/deleteItem/", (req, res) =>{
    const iditem = req.body.iditem
    const sqldeleteitem =
        "call pItem_delete(?)"
        db.query(sqldeleteitem, iditem, (err, result) => {
            if (err) console.log(err)
        })
    const sqldeleteinventory =
    "call pItemInventory_delete(?)"
    db.query(sqldeleteinventory, iditem, (err, result) => {
        if (err) console.log(err)
    })
})

app.delete("/api/deleteCase/", (req, res) =>{
    const idcase = req.body.idcase
    const sqldeletecase =
    "call pCase_delete(?)"
    db.query(sqldeletecase, idcase, (err, result) => {
        if (err) console.log(err)
    })
    
    // const sqldeleteitems =
    // "call pSkinCase_delete(?)"
    // db.query(sqldeleteitems, idcase, (err, result) => {
    //     if (err) console.log(err)
    // })

})

// INSERTS
app.post("/api/insertUser", (req, res) => {
    const idAuth = req.body.idAuth
    const tokens = parseInt(req.body.tokens)
    const phone = parseInt(req.body.phone)
    const sql = 
        "call pUser_insert(?,?,?)"
    db.query(sql, [idAuth, tokens, phone], (err, result) => {
        if (err) console.log(err)
    })
})

app.post("/api/insertCase", (req, res) => {
    const name = req.body.name
    const img = req.body.img
    const price = req.body.price
    const sql = 
        "call pCase_insert(?,?,?)"
    db.query(sql, [name, img, price], (err, result) => {
        if (err) console.log(err)
    })
})

// SELECTS
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

app.get("/api/getOneUser/:auth0", (req, res) => {
    const auth0 = req.params.auth0
    const sql =
        "call pOneUser_select(?)"
    db.query(sql, auth0, (err, result)=> {
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