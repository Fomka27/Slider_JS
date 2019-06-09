function Slider(data) {
    const {
        images = [], 
        effect = 'fide', 
        container_id = 'slider',
        defaultImage = 0,
        autoPlay = 0,
        autoPlayType = 'right',
    } = data;

    this.autoPlay = autoPlay;
    this.autoPlayType = autoPlayType;
    this.autoPlayId = '';
   this.images = images;
   this.count = images.length - 1;
   this.effect = effect;
   this.container_id = container_id;
   this.activeImage = defaultImage;
   this.container = document.querySelector(container_id);
   this.btnRight = document.createElement('i');
   this.btnLeft = document.createElement('i');
   this.wrapper = document.createElement('div');
   this.imgContainer = document.createElement('img');

   
   this.changeImageLeft = () => {
        if(this.activeImage === 0) {
            this.activeImage = this.count;
        }else{
            this.activeImage--;
        }
        this.setActiveImage();
    }

   this.changeImageRight = () => {
        if(this.activeImage === this.count) {
            this.activeImage = 0;
        }else{
            this.activeImage++;
        }
        this.setActiveImage();
    }

   this.setActiveImage = () => {
        const { alt, link } = this.images[this.activeImage];
        this.imgContainer.remove();
        this.imgContainer.src = link;
        this.imgContainer.alt = alt;
        this.wrapper.appendChild(this.imgContainer);
   }

   this.autoPlayStart = () =>{
       const handlerAutoPlay = this.autoPlayType === 'left'
       ? this.changeImageLeft 
       : this.changeImageRight;

        if(this.autoPlay){
            this.autoPlayId = setInterval(
            handlerAutoPlay,
            this.autoPlay);
        };
        
    }

    this.autoPlayStop = () =>{
        clearInterval(this.autoPlayId);
    }

    this.hoverSlide = (event) => {
        if(this.autoPlay){
            event.type === 'mouseenter' 
            ? this.autoPlayStop()
            : this.autoPlayStart();
        }
    }

    this.btnRight.onclick = this.changeImageRight;
    this.btnLeft.onclick = this.changeImageLeft;
    this.wrapper.onmouseenter = this.hoverSlide;
    this.wrapper.onmouseleave = this.hoverSlide;

    this.render = function () {
        this.wrapper.className = `slider effect-${this.effect}`;
        this.btnLeft.className = 'btn-left';
        this.btnRight.className = 'btn-right';
        this.imgContainer.className = 'active';
 
        this.btnLeft.innerHTML = '<';
        this.btnRight.innerHTML = '>';
 
        this.setActiveImage();
 
        this.wrapper.appendChild(this.btnLeft);
         this.wrapper.appendChild(this.imgContainer);
         this.wrapper.appendChild(this.btnRight);
 
        this.container.appendChild(this.wrapper);
        
    }

    this.render();
    this.autoPlayStart();

}

var slider = new Slider({
    container_id:'#slider-block-1',
    images:dataimages,
    effect:'fide',
    defaultImage:1,
    autoPlay:2000,
    autoPlayType:'right',
});

var slider2 = new Slider({
    container_id:'#slider-block-2',
    images:dataimages,
    effect:'fide',
    defaultImage:3,
    autoPlay:2000,
    autoPlayType:'right',
});



