function randomNum(maximo,minimo) {
    return Math.round(Math.random() * (maximo - minimo) + minimo); 
}
function reduce(valor1,valor2){
    if(valor1 - valor2 >= 0) return valor1 -= valor2;
    else return valor1 = 0;
}
function increase(valor1,valor2){
    if(valor1 + valor2 <= 100) return valor1 += valor2;
    else return valor1 = 100;
}

const app = Vue.createApp({
data(){
    return{
        monsterHealt: 100,
        userHealt: 100,
        counter: 0,
        winner: 'stop',
        record: [],
        valid: false
        };
    },
computed:{
    monsterBarStyle(){
        return {width: this.monsterHealt + '%'};
    },
    userBarStyle(){
        return {width: this.userHealt + '%'};
    }
},
watch:{
    userHealt(value){
        if(value <= 0 && this.monsterHealt <= 0){
            this.winner = 'draw';
        } else if (value <= 0){
            this.winner = 'monster';
        }
    },
    monsterHealt(value){
        if(value <= 0 && this.userHealt <= 0){
            this.winner = 'draw';
        } else if (value <= 0){
            this.winner = 'user';
        }
    }
},
methods:{
    attackMonster(){
        const aux = randomNum(12,6);
        this.monsterHealt = reduce(this.monsterHealt,aux);
        this.attackUser();
        this.addARecord('Monster', 'Attack', aux);
    },
    attackUser(){
        const aux = randomNum(14,8);
        this.userHealt = reduce(this.userHealt,aux);
        this.addARecord('User', 'Attack', aux);
    },
    specialAtack(){
        const aux = randomNum(25,15);
        if(this.counter % 3 == 0){
            this.monsterHealt = reduce(this.monsterHealt,aux); 
            this.attackUser();
            this.addARecord('User', 'Special Attack', aux);
            this.counter++;
        }
    },
    healPlayer(){    
        const aux = randomNum(18,6)
        this.userHealt = increase(this.userHealt,aux);
        this.addARecord('User', 'Heal', aux);
    },
    startGame(){
        this.monsterHealt = 100;
        this.userHealt = 100;
        this.counter = 0;
        this.winner = null;
        this.record = [];
    },
    surrender(){
        this.userHealt = 0;
    },
    setColor(color){
        var colorMonster = document.getElementById('monsterColor');
        var userColor = document.getElementById('userColor');
        if(color === 'red'){
            colorMonster.setAttribute('class', 'healthbar__valueRed');
            userColor.setAttribute('class', 'healthbar__valueRed');
        }
        if(color === 'green'){
            colorMonster.setAttribute('class', 'healthbar__valueGreen');
            userColor.setAttribute('class', 'healthbar__valueGreen');
        } 
        if(color === 'blue'){
             colorMonster.setAttribute('class', 'healthbar__valueBlue'); 
             userColor.setAttribute('class', 'healthbar__valueBlue'); 
        }
        if(color === 'yellow'){
            colorMonster.setAttribute('class', 'healthbar__valueYellow');
            userColor.setAttribute('class', 'healthbar__valueYellow'); 
        }
        return this.valid = true;
    },
    addARecord(who, what, value) {
        this.record.unshift({
          actionBy: who,
          actionType: what,
          actionValue: value,
        });
    }
}
});
app.mount('#game');