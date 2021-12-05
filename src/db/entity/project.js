module.exports = class Project {

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.start = data.start;
        this.finish = data.finish;
        this.leader = data.leader;
        this.state = data.state;
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

    get_start(){
        return this.start;
    }

    get_finish(){
        return this.finish;
    }

    get_leader(){
        return this.leader;
    }

    get_state(){
        return this.state;
    }

    get_team(){
        return this.team;
    }
}
