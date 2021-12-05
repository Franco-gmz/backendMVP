module.exports = class Task {

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.state = data.state;
        this.project = data.id_project;
        this.team = data.team;
    }

    get_id(){
        return this.id;
    }

    get_name(){
        return this.name;
    }

    get_description(){
        return this.description;
    }

    get_state(){
        return this.state;
    }

    get_project(){
        return this.project;
    }

    get_team(){
        return this.team;
    }
}
