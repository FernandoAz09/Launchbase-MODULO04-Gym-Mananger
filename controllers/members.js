const fs = require('fs') 
const data = require('../data.json')
const { age, date } = require('../utils') 
const Intl = require('intl')



exports.index = function(req, res) {
    return res.render("members/index", { members: data.members })
}

// SHOW
exports.show = function(req,res) { 
    const { id } = req.params 

    const foudMember = data.members.find(function(member){ 
        return member.id == id 
    })

    if (!foudMember) return res.send("Member not found!")

    const member = { 
        ...foudMember, 
        age: age(foudMember.birth),
    }

    return res.render("members/show", { member }) 
}

// CREATE

exports.create = function(req, res) { 
    return res.render("members/create")
}

// POST
exports.post = function(req, res) { 

    const keys = Object.keys(req.body)

    for(key of keys) { 
        if(req.body[key] == "") { 
            return res.send('Por favor, preencha todos os campos.') 
        }
    }
    
    let {avatar_url, name, birth, gender, services} = req.body 
    
    birth = Date.parse(birth) 
    const created_at = Date.now() 
    const id = Number(data.members.length + 1) 
    
    data.members.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }) 
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error.") 

        return res.redirect("/members")
    })

}

// EDIT

exports.edit = function(req, res) {

    const { id } = req.params 

    const foudMember = data.members.find(function(member){ 
        return member.id == id 
    })

    if (!foudMember) return res.send("Member not found!")
    
    const member = {
        ...foudMember,
        birth: date(foudMember.birth)
    }

    return res.render("members/edit", {member})  
}

// PUT
exports.put = function(req, res) {
    const { id } = req.body 
    let index = 0


    const foudMember = data.members.find(function(member, foundIndex){ 
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foudMember) return res.send("Member not found!")

    const member = {
        ...foudMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })
}

// DELETE

exports.delete = function(req,res) {
    const { id } = req.body 

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/members")
    })
}