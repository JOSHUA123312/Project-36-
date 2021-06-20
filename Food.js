class Food{
    constructor(){
        this.image=loadImage("images/Milk.png")
        this.lastfed
        this.foodStock
    }
    bedroom(){
        background(bedRoom,500,500)
    }

    garden(){
        background(garden,400,100)
    }

    washroom(){
        background(washRoom,500,500)
    }

    getFedTime(lastfed){
       this.lastfed=lastfed
    }
    getFoodStock(){
        return this.foodStock
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1
        }

    }
    display(){
        var x=80,y=100;
        
        imageMode(CENTER)
        
        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30
            }
        }
    }
}