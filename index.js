function Main(elemId) {
    var x = this;
    this.mainElem = document.getElementById(elemId);

    this.addTrackImg = () => {
        var img = document.createElement('img');
        img.setAttribute('id', 'trackImg')
        img.style.width = "100%"
        img.style.height = "200%"
        img.style.marginTop = "-400px"
        img.style.postion = "absolute"
        img.src = 'track.png';
        this.trackimg = img;
        this.track.appendChild(img);
    }

    this.createTrack = () => {
        var track = document.createElement("div");
        track.setAttribute('id', 'track');
        track.style.marginLeft = "500px";
        track.style.marginTop = "40px";
        track.style.width = "300px";
        track.style.height = "400px";
        track.style.border = "solid black";
        track.style.overflow = "hidden";
        this.mainElem.appendChild(track);
        this.track = track;
    }

    this.createCar = () => {
        this.car = document.createElement("div");
        this.car.setAttribute('id', 'car');
        this.car.style.marginLeft = "25px";
        this.car.style.marginTop = "300px";
        this.car.style.width = "50px";
        this.car.style.height = "100px";
        this.car.height = 100;
        this.car.style.position = "absolute";
        this.car.lane = 0;
        var img = document.createElement('img');
        img.style.width = "100%"
        img.src = 'car.png';
        this.car.appendChild(img);
        this.track.appendChild(this.car);
        this.car.xPos = parseInt(this.car.style.marginLeft.replace('px', ''))
        this.car.yPos = parseInt(this.car.style.marginTop.replace('px', ''))

    }

    this.eventListener = () => {
        var ntrack = document.getElementsByTagName('body')[0];
        ntrack.addEventListener('keydown', (ev) => this.handleKeyPress(ev));
    }

    this.handleKeyPress = (ev) => {
        if (ev.code == 'ArrowLeft') {
            if (this.car.lane > 0) {
                var prev = (this.car.style.marginLeft.replace('px', ''))
                this.car.style.marginLeft = (parseInt(prev) - 100) + "px";
                this.car.lane--;
                this.car.xPos = parseInt(prev) - 100;
                this.car.yPos = parseInt(this.car.style.marginTop.replace('px', ''));
            }
        }
        else if (ev.code == 'ArrowRight') {
            if (this.car.lane < 2) {
                var prev = (this.car.style.marginLeft.replace('px', ''))
                this.car.style.marginLeft = (parseInt(prev) + 100) + "px";
                this.car.xPos = parseInt(prev) + 100;
                this.car.yPos = (this.car.style.marginTop.replace('px', ''))
                this.car.lane++;
            }
        } else {
            // nothing            
            return 0;
        }
    }

    this.setObstacleOnLane = () => {
        var center = 20;
        var pos = Math.ceil(Math.ceil(Math.random() * 9) / 3);
        switch (pos) {
            case 0:
                this.obstacle.style.marginLeft = center + "px";
                this.obstacle.lane = 0;
                this.obstacle.xPos = center;
                break;
            case 1:
                this.obstacle.style.marginLeft = 100 + center + "px";
                this.obstacle.lane = 1;
                this.obstacle.xPos = 100 + center;
                break;
            case 3:
                this.obstacle.style.marginLeft = 200 + center + "px";
                this.obstacle.lane = 2;
                this.obstacle.xPos = 100 + center;
                break;
            default:
                this.obstacle.style.marginLeft = center + "px";
                this.obstacle.lane = 0;
                this.obstacle.xPos = 100 + center;
                break;
        }
        this.obstacle.style.marginTop = "-400px";
        this.obstacle.yPos = -400;
    }

    this.createObstacle = () => {
        this.obstacle = document.createElement('div');
        this.obstacle.setAttribute('id', 'obstacle');
        this.obstacle.style.width = "40px";
        this.obstacle.style.height = "5px";
        this.setObstacleOnLane();
        var img = document.createElement('img');
        img.src = 'obstacle.png';
        this.obstacle.appendChild(img);
        this.obstacle.style.display = 'absolute'
        this.track.appendChild(this.obstacle);
    }

    this.animateObstacle = () => {
        this.interval = setInterval(() => {
            var cTrackMarginTop = parseInt(this.trackimg.style.marginTop.replace('px', ''))
            if (cTrackMarginTop < 0) {
                this.trackimg.style.marginTop = cTrackMarginTop + 5 + 'px';
            } else {
                this.trackimg.style.marginTop = '-400px';
                this.setObstacleOnLane();
            }
            this.collisionDetect();
        }, 50);

    }

    this.collisionDetect = () => {
        var carX = this.car.xPos;
        var carY = this.car.yPos;
        var carHeight = this.car.height;
        var carLane = this.car.lane;
        var obsY = parseInt(this.trackimg.style.marginTop.replace('px', ''));
        var obsX = parseInt(this.obstacle.style.marginLeft.replace('px', ''))
        var obsLane = this.obstacle.lane;
        if (carLane === obsLane && obsY >= -100) {
            alert("game over")
            clearInterval(this.interval);
            location.reload()
        }
    }

    this.init = () => {
        this.createTrack();
        this.createCar();
        this.addTrackImg();
        this.createObstacle();
        this.eventListener();
        this.animateObstacle();

    }
}

var main = new Main('container');
main.init()
