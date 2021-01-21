const fs = require('fs') 
const data = require('../data.json')
const { date } = require('../utils') 
const Intl = require('intl')


// INDEX
exports.index = function(req, res) {
    return res.render("members/index", { members: data.members })
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
    
    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastMember = data.members[data.members.length - 1]
    if (lastMember) {
        id = lastMember.id +1
    }
    
    data.members.push({
        id,
        ...req.body,
        birth
    }) 
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error.") 
        
        return res.redirect(`/members/${id}`)
    })
    
}

// SHOW
exports.show = function(req,res) { 
    const { id } = req.params 

    const foudMember = data.members.find(function(member){ 
        return member.id == id 
    })

    const converterBlood = data.members.find(function(member) {
        if ('A1' == member.blood) {
            member.blood = 'A +'
        } else if ('A0' == member.blood) {
            member.blood = 'A -'
        } else if ('B1' == member.blood) {
            member.blood = 'B +'
        } else if ('B2' == member.blood) {
            member.blood = 'B -'
        } else if ('AB1' == member.blood) {
            member.blood = 'AB +'
        } else if ('AB0' == member.blood) {
                member.blood = 'AB -'
        } else if ('O1' == member.blood) {
            member.blood = 'O +'
        } else if ('O0' == member.blood) {
            member.blood = 'O -'
        } 
    })

    if (!foudMember) return res.send("Member not found!")

    const member = { 
        ...foudMember, 
        birth: date(foudMember.birth).birthDay
    }

    return res.render("members/show", { member }) 
}
// EDIT

exports.edit = function(req, res) {
    // req.params
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return  id == member.id
    })

    if(!foundMember) return res.send('Member not found!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', { member })
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