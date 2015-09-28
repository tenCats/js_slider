// Copyright (c) 2015 Copyright Holder All Rights Reserved.

function $ (s) {
	return document.querySelector(s);
}

var slider = function (root, c) {
	this.dom = {};
	this.dom.root = root;
	this.dom.slides = [].slice.call(root.children);
	this.dom.totalCount = this.dom.slides.length;
	this.dom.classType = c;

	this.__cmdArray = [];
	this.__sRunning = false;

}

slider.prototype.execute = function (fName, argu, delay) {
      var newCmd = {};

      newCmd.fName = fName;
      newCmd.argu = argu;
      newCmd.delay = delay || 0;

      this.__cmdArray.push(newCmd);

      this.__execute();
  };

  slider.prototype.__execute = function () {

      var self = this;

      if (self.__sRunning) {return;}
      self.__sRunning = true;

      if(self.__cmdArray.length) {

          var nowDo = self.__cmdArray.shift();

          //the element in __cmdArray can be one function or a bunch of functions
          if (typeof(nowDo.fName) === 'string'){
              self[nowDo.fName](nowDo.argu);
          }
          if (typeof(nowDo.fName) === 'object' && nowDo.fName.constructor === [].constructor){

              for (var i = nowDo.fName.length-1 ; i >= 0; i--) {
                  self[nowDo.fName[i]](nowDo.argu[i]);
              };
          }

          setTimeout(function(){

              self.__sRunning = false;
              self.__execute();

          }, nowDo.delay*1000);

      }else {
          self.__sRunning = false;
      }

  };


slider.prototype.up = function (opt) {
	var self = this,
		arr = opt.arr,
		arr_l = arr.length,
		arr_l_temp = arr_l,

		frag = document.createDocumentFragment();

	for (var i = 0; i < arr_l; i++){
		var div = document.createElement('div');
		div.innerHTML = arr[i];
		div.className = self.dom.classType+' '+self.dom.classType+'-'+(this.dom.totalCount+1);
		frag.appendChild(div);
	}

	self.dom.root.appendChild(frag);

	var middle = Math.floor(self.dom.totalCount/2);
	for(var i = 0; i < self.dom.totalCount; i++){
		if (i!=middle) {
			self.dom.slides[i].classList.remove('hide');
		};
	}

	self.dom.slides = [].slice.call(self.dom.root.children);
	arr_l_temp > 0 && setTimeout(__slide,0);

	function __slide () {
		arr_l_temp--;

		for(var i = 0; i <= self.dom.totalCount; i++){
			self.dom.slides[i].classList.remove(self.dom.classType+'-'+(i+1));
			self.dom.slides[i].classList.add(self.dom.classType+'-'+i);
		}
		setTimeout(function () {

			self.dom.root.removeChild(self.dom.slides[0]);
			self.dom.slides.shift();
			if (arr_l_temp == 0) {
				for(var i = 0; i < self.dom.totalCount; i++){
					if (i!=middle) {
						self.dom.slides[i].classList.add('hide');
					};
				}
			}else{
				__slide();
			}
		},300);
	}
};

slider.prototype.down = function (opt) {
	var self = this,
		arr = opt.arr,
		arr_l = arr.length,
		arr_l_temp = arr_l,

		frag = document.createDocumentFragment();

	for (var i = arr_l-1; i >= 0; i--){
		var div = document.createElement('div');
		div.innerHTML = arr[i];
		div.className = self.dom.classType+' '+self.dom.classType+'-0';
		frag.appendChild(div);
	}

	self.dom.root.insertBefore(frag,self.dom.slides[0]);

	var middle = Math.floor(self.dom.totalCount/2);
	for(var i = 0; i < self.dom.totalCount; i++){
		if (i!=middle) {
			self.dom.slides[i].classList.remove('hide');
		};
	}

	self.dom.slides = [].slice.call(self.dom.root.children);
	arr_l_temp > 0 && setTimeout(__slide,0);

	function __slide () {
		arr_l_temp--;

		for(var i = arr_l_temp; i <= self.dom.totalCount+arr_l_temp; i++){
			self.dom.slides[i].classList.remove(self.dom.classType+'-'+(i-arr_l_temp));
			self.dom.slides[i].classList.add(self.dom.classType+'-'+(i-arr_l_temp+1));
		}
		setTimeout(function () {

			self.dom.root.removeChild(self.dom.slides[arr_l_temp+self.dom.totalCount]);
			self.dom.slides.pop();

			if (arr_l_temp == 0) {
				for(var i = 0; i < self.dom.totalCount; i++){
					if (i!=middle) {
						self.dom.slides[i].classList.add('hide');
					};
				}
			}else{
				__slide();
			}
		},300);
	}
};
