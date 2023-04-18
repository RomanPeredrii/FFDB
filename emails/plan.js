module.exports = function(data) {
    return {
        from: 'ffdb_planning@ukr.net', 
        to: user.email,
        subject: ` Account ${user.name} is done`,
        html: `
        <h3> Account ${user.name} is done </h3>
        <h3> chek details below please </h3> 
        <h5> ${user.name} </h5>
        <h5> ${user.role} </h5>
        <h5> ${user.department} </h5>
        <h5> ${user.login} </h5>
        <p>    
          <a href='http://localhost:3000'>for set password use the link  
        </p>
        <p>
          if you've found uncorect data ......
        </p>`
      }
}


