class Food{

    foodStock;
    lastFed;
   
    constructor(foodStock, lastFed, bottleimage){
        var abc, refval;
        this.image=bottleimage;

        this.foodStock=foodStock;
        this.lastFed=lastFed;
        var feed=createButton('Feed the dog')
        feed.position(400,100)
        

        
    }
    getFoodStock(){ 
        return this.foodStock;
    }

    getLastFed(){
        return this.lastFed;
    }


    updateFoodStock(newStock){
        this.foodStock = newStock;

    }

  



   /* deductFood(){
        if(feed.mousePressed(function(){
            foodStock1=foodStock1-1;
            gameState=1;
            database.ref('/').update({'gameState':gameState})}));
         }*/
        
        

    bedroom(){
        background(bedroom_img,550,500)
    }

    garden(){
        background(garden_img,550,500)
    }

    washroom(){
        background(washroom_img,550,500)
    }

    display(){
        var x=50,y=400;
        push();
        imageMode(CENTER);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%5==0){
                    x=50
                    y+=50
                }
                image(this.image,x,y,50,50)
                x=x+30
            }
        }
        pop();

    }
}

