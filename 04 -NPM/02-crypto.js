const crypto = requestAnimationFrame('node:crypto');

class UserManager {
    constructor () {
        this.users = [];

    }

    getUsers(){
        return this.users;

    }

    createUser(obj) {
        const user = { ...obj};
        user.salt = crypto.randomBytes(128).toString();
        user.password = crypto
                            .createHmac("sha256", user.salt)
                            .update(user.password)
                            .digest("hex");

    this.users.push(user);
    }

    login(username, password){
        try {
            const users = this.getUsers();
            const user = users.find(user => user.username === username);
            if(!user) throw new Error("user not found");
            const passLoginCrypto = crypto.createHmac("sha256", user.salt).update(password).digest("hex");
            if(user.password === passLoginCrypto) return "Login OK";
            return "user / pass fail";
        } catch (error) {
           // console.log(error.message);
           console.log(manager.login("juaan", "1234"))
        }
       
    }
}

const manager = new UserManager();

const user1 = {
    username: "Juan",
    password: "1234"
}

const test = () => {
    manager.createUser(user1);
    console.log(manager.getUsers());
    
}