//=============================================================================
// CARD DECK SIMULATOR
//=============================================================================

"use strict";

//-----------------------------------------------------------------------------
// cards OBJECT
//-----------------------------------------------------------------------------

var cards = {
	images : ["AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "TH",
	          "JH", "QH", "KH", "AD", "2D", "3D", "4D", "5D", "6D", "7D",
			  "8D", "9D", "TD", "JD", "QD", "KD", "AC", "2C", "3C", "4C",
			  "5C", "6C", "7C", "8C", "9C", "TC", "JC", "QC", "KC", "AS",
			  "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "TS", "JS",
			  "QS", "KS"],

	french : ["as de coeur", "2 de coeur", "3 de coeur", "4 de coeur",
	        "5 de coeur", "6 de coeur", "7 de coeur", "8 de coeur",
			"9 de coeur", "10 de coeur", "valet de coeur", "dame de coeur",
			"roi de coeur", "as de carreau", "2 de carreau",
			"3 de carreau", "4 de carreau", "5 de carreau",
			"6 de carreau", "7 de carreau", "8 de carreau",
			"9 de carreau", "10 de carreau", "valet de carreau",
			"dame de carreau", "roi de carreau", "as de trèfle",
			"2 de trèfle", "3 de trèfle", "4 de trèfle", "5 de trèfle",
			"6 de trèfle", "7 de trèfle", "8 de trèfle", "9 de trèfle",
			"10 de trèfle", "valet de trèfle", "dame de trèfle",
			"roi de trèfle", "as de pique", "2 de pique", "3 de pique",
			"4 de pique", "5 de pique", "6 de pique", "7 de pique",
			"8 de pique", "9 de pique", "10 de pique", "valet de pique",
			"dame de pique", "roi de pique"],

	english : ["Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts",
	        "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts",
			"9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts",
			"King of Hearts", "Ace of Diamondds", "2 of Diamondds",
			"3 of Diamondds", "4 of Diamondds", "5 of Diamondds",
			"6 of Diamondds", "7 of Diamondds", "8 of Diamondds",
			"9 of Diamondds", "10 of Diamondds", "Jack of Diamondds",
			"Queen of Diamondds", "King of Diamondds", "Ace of Clubs",
			"2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs",
			"6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs",
			"10 of Clubs", "Jack of Clubs", "Queen of Clubs",
			"King of Clubs", "Ace of Spades", "2 of Spades", "3 of Spades",
			"4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades",
			"8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades",
			"Queen of Spades", "King of Spades"],

	image : function(no) {
		return "images_cards/" + this.images[no] + "_card.gif";
	},

	transparent : "images_cards/transparent_card.gif",

	desc : function(no) {
		return this.english[no];
	},

	code : function(no) {
		return this.images[no];
	}

}

//-----------------------------------------------------------------------------
// deck OBJECT
//-----------------------------------------------------------------------------

var deck = {
	stack : [],

	history : [],

	marked : [],

	newBicycle : "AH2H3H4H5H6H7H8H9HTHJHQHKHAC2C3C4C5C6C7C8C9CTCJCQCKCKDQDJDTD9D8D7D6D5D4D3D2DADKSQSJSTS9S8S7S6S5S4S3S2SAS",
	newFournier : "AS2S3S4S5S6S7S8S9STSJSQSKSAH2H3H4H5H6H7H8H9HTHJHQHKHKDQDJDTD9D8D7D6D5D4D3D2DADKCQCJCTC9C8C7C6C5C4C3C2CAC",
	newAronson : "JSKC5C2H9SAS3H6C8DACTS5H2DKD7D8C3SAD7S5SQDAH8S3D7HQH5D7C4HKH4DTDJCJHTCJD4STH6H3C2S9HKS6S4C8H9CQS6DQC2C9D",
	newTamariz : "4C2H7D3C4H6DAS5H9S2SQH3DQC8H6S5S9HKC2DJH3S8S6HTC5DKD2C3H8D5CKSJD8CTSKHJC7STHAD4S7H4DAC9CJSQD7CQSTD6CAH9D",
	newSiStebbins : "AC4H7STDKC3H6S9DQC2H5S8DJCAH4S7DTCKH3S6D9CQH2S5D8CJHAS4D7CTHKS3D6C9HQS2D5C8HJSAD4C7HTSKD3C6H9SQD2C5H8SJD",
	newStay : "4H4CTDJSTCJH5S3D5H3C9DQS9CQH6S2D6H2C8DKS8CKH7SAD7HACAS7DAH7CKD8SKC8H2S6D2H6CQD9SQC9H3S5D3H5CJDTSJCTH4S4D",
	newJoyal : "JH6C6H4CTDAD7C4H9C5DQHASKC7HTS4SJS9HKD5S7S2CQCAHTH6S9S7DQD5HKH4D3C3HTC9DQS3S3D2H8C2SJC2D8H8SKSACJD5C8D6D",
	newOsterlind : "4HTCTDJSTH9S6C2C7H3H8S4CJDKSAS3S7D5HQCAC5SJHJCQD2D8C6SKH2H6D3DTS8D7C4S9D9C8H5DAD6HAH4DQSQHKC3C9H7S2S5CKD",
	newNikola : "6D5CKCJH5S9D9SQH3CTCKSAH4DJDKDKH2DQC9CTH8D2CAC7H7C4S7S9H8S6S6C2HASJS4C5HTSADJC4H2S7DQS3H3S8CTD6H5D3DQD8H",
	newEight_kings : "8CKH3STD2C7H9S5DQC4HAS6DJC8HKS3DTC2H7S9D5CQH4SAD6CJH8SKD3CTH2S7D9C5HQS4DAC6HJS8DKC3HTS2D7C9H5SQD4CAH6SJD",

	init : function() {
		var pos;

		for(pos=0; pos<52; pos++) {
			this.stack[pos] = pos;
			this.marked[pos] = false;
		}
	},

	setDeckOrder : function(order) {

		this.memo();

		if(order === "bicycle") {
			this.setDeckString(this.newBicycle);
		} else if(order === "siStebbins") {
			this.setDeckString(this.newSiStebbins);
		} else if(order === "tamariz") {
			this.setDeckString(this.newTamariz);
		} else if(order === "stay") {
			this.setDeckString(this.newStay);
		} else if(order === "aronson") {
			this.setDeckString(this.newAronson);
		} else if(order === "joyal") {
			this.setDeckString(this.newJoyal);
		} else if(order === "osterlind") {
			this.setDeckString(this.newOsterlind);
		} else if(order === "nikola") {
			this.setDeckString(this.newNikola);
		} else if(order === "eight_kings") {
			this.setDeckString(this.newEight_kings);
		}
	},

	getDeckString : function() {
		var pos;
		var deck_string;

		deck_string = [];
		for(pos=0; pos<this.stack.length; pos++) {
			deck_string.push(cards.code(this.stack[pos]));
		}
		deck_string = deck_string.join("").toUpperCase();
		return deck_string;
	},

	setDeckString : function(deck_string) {
		var pos;
		var no;

		for(pos=0; pos<52; pos++) {
			no = cards.images.findIndex(function(code) {
				return code === deck_string.substr(pos*2, 2);
			});
			this.stack[pos] = no;
		}
		deck.display();
	},

	memo : function() {
		this.history.push(JSON.stringify(this.stack));
	},

	undo : function() {
		if(this.history.length !== 0) {
			this.stack = JSON.parse(this.history.pop());
			deck.display();
		}
		if(this.history.length > 100) {
			this.history.shift();
		}
	},

	shuffle : function () {
		var pos;
		var newPos;
		var tmp;

		this.memo();

		for (pos = this.stack.length; pos; pos--) {
			newPos = Math.floor(Math.random() * pos);
			tmp = this.stack[pos - 1];
			this.stack[pos - 1] = this.stack[newPos];
			this.stack[newPos] = tmp;
		}
	},

	faro_in : function() {
		var pos;
		var newStack;

		this.memo();

		newStack = [];
		for(pos=0; pos<52; pos++) {
			if(pos<26) {
				newStack[(pos*2)+1] = this.stack[pos];
			} else {
				newStack[(pos*2)%52] = this.stack[pos];
			}
		}

		this.stack = newStack;
	},

	faro_out : function() {
		var pos;
		var newStack;

		this.memo();

		newStack = [];
		for(pos=0; pos<52; pos++) {
			if(pos<26) {
				newStack[(pos*2)] = this.stack[pos];
			} else {
				newStack[(pos-26)*2 +1] = this.stack[pos];
			}
		}
		this.stack = newStack;
	},

	anti_faro_in : function() {
		var pos;
		var newStack;

		this.memo();

		newStack = [];
		for(pos=0; pos<52; pos++) {
			if(pos % 2 === 0) {
				newStack[(pos+52)/2] = this.stack[pos];
			} else {
				newStack[(pos-1)/2] = this.stack[pos];
			}
		}
		this.stack = newStack;
	},


	anti_faro_out : function() {
		var pos;
		var newStack;

		this.memo();

		newStack = [];
		for(pos=0; pos<52; pos++) {
			if(pos % 2 === 0) {
				newStack[pos/2] = this.stack[pos];
			} else {
				newStack[(pos+51)/2] = this.stack[pos];
			}
		}
		this.stack = newStack;
	},

	cut : function(no) {
        var pos;
        var newStack;

		this.memo();

        no = Number(no);

        newStack = [];
        for(pos=0; pos<52; pos++) {
            newStack[pos] = (this.stack[(pos+no)%52]);
        }
        this.stack = newStack;
	},

	displace : function(pos, new_pos) {
		var tmp;

		if(pos !== new_pos) {
			this.memo();
			tmp = this.stack[pos];
			this.stack.splice(pos, 1);

			if(new_pos < pos) {
				this.stack.splice(new_pos+1, 0, tmp);
			} else if(new_pos > pos) {
				this.stack.splice(new_pos, 0, tmp);
			}
		}
	},

	reverse : function() {
		this.memo();

		this.stack = this.stack.reverse();
	},

	setMark : function(no) {
		this.marked[this.stack[no]] = true;
	},

	clearMark : function(no) {
		this.marked[this.stack[no]] = false;
	},

	getMark : function(no) {
		return this.marked[this.stack[no]];
	},

	display : function() {
		var pos;
		var id;
		var rot;
		var xx;
		var yy;
		var angle;

		pos = -1;
		angle = pos*3.46 * (Math.PI / 180);
		xx = 450 + Math.sin((angle - 3.14/2)*.8) * 400;
		yy = 400 + (-270 * Math.sin(angle)) * 1.0;
		rot = (-(Math.sin(angle + Math.PI/2)) * 90 ) * .7;
		id = "c-1";
		document.getElementById(id).style.left = xx + "px";
		document.getElementById(id).style.top = yy + "px";
		document.getElementById(id).style.transform = "rotate(" + rot + "deg)";

		for(pos=0; pos<52; pos++) {
			id = "c" + pos;
			document.getElementById(id).src = cards.image(this.stack[pos]);
			angle = pos*3.46 * (Math.PI / 180);
			xx = 450 + Math.sin((angle - 3.14/2)*.8) * 400;
			yy = 400 + (-270 * Math.sin(angle)) * 1.0;
			rot = (-(Math.sin(angle + Math.PI/2)) * 90 ) * .7;
			document.getElementById(id).style.left = xx + "px";
			document.getElementById(id).style.top = yy + "px";
			document.getElementById(id).style.transform = "rotate(" + rot + "deg)";
			document.getElementById(id).setAttribute("title", cards.desc(this.stack[pos]) + "\nPosition : " + (pos+1));
			if(this.marked[this.stack[pos]] === true) {
				document.getElementById(id).classList.add("marked");
			} else {
				document.getElementById(id).classList.remove("marked");
			}
		}

	}
}

//-----------------------------------------------------------------------------
// UI CALL-BACK FUNCTIONS
//-----------------------------------------------------------------------------

var ui = {

	anti_faro_in : function(e) {
		deck.anti_faro_in();
		deck.display();
	},

	anti_faro_out : function() {
		deck.anti_faro_out();
		deck.display();
	},

	faro_in : function(e) {
		deck.faro_in();
		deck.display();
	},

	faro_out : function() {
		deck.faro_out();
		deck.display();
	},

	setReOrderUI : function() {
		document.getElementById("mainUI").style.display = "none";
		document.getElementById("main_instructions").style.display = "none";
		document.getElementById("reOrderUI").style.display = "block";
	},

	setMainUI : function() {
		document.getElementById("mainUI").style.display = "block";
		document.getElementById("main_instructions").style.display = "block";
		document.getElementById("reOrderUI").style.display = "none";
	},

	reOrder : function(order) {
		deck.setDeckOrder(order);
		document.getElementById("mainUI").style.display = "block";
		document.getElementById("main_instructions").style.display = "block";
		document.getElementById("reOrderUI").style.display = "none";
	},

	writeFile : function saveTextAsFile(stringDeck) {
		var textToSaveAsBlob = new Blob([stringDeck], {type:"text/plain"});
		var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
		var fileNameToSaveAs = "deck.txt";

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = textToSaveAsURL;
		//downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);

		downloadLink.click();
	},

	save : function() {
		var stringDeck;

		stringDeck = deck.getDeckString();
		ui.writeFile(stringDeck);
	},

	file : function(e) {
		var file;
		var target;

		e = e || window.event;
		target = e.target || e.srcElement;

		file = target.files[0];

		var reader = new FileReader();

		reader.onload = (function(file) {
			return function(e) {
				var liste_b64
				var liste_cartes;
				liste_b64 = e.target.result.split(",")[1];
				liste_cartes = atob(liste_b64);
				deck.setDeckString(liste_cartes);
			};
		})(file);

		// image file is read as a data URL

		reader.readAsDataURL(file);
	},

	reverse : function() {
		deck.reverse();
		deck.display();
	},

	shuffle : function() {
		deck.shuffle();
		deck.display();
	},

	markCard : function(card) {
		var id;
		var no;

		id = card.getAttribute("id");
		no = Number(id.substr(1));
		
		if(deck.getMark(no) === false) {
			deck.setMark(no);
		} else {
			deck.clearMark(no);
		}
		deck.display();
	},

	cutDeck : function(card) {
		var id;
		var no;

		id = card.getAttribute("id");
		no = Number(id.substr(1));
		
		deck.cut(no);
		deck.display();
	},

	dragstart : function(e) {
		var id;
		var target;
		var no;
		var dragImage;

		e = e || window.event;
		target = e.target || e.srcElement;
		id = target.getAttribute("id");
		no = Number(id.substr(1));
		e.dataTransfer.setData("text/plain", no);

		dragImage = target.cloneNode(true);
		target.setAttribute("src", cards.transparent);
		e.dataTransfer.setDragImage(dragImage, 0, 0);
	},

	dragover : function(e) {
		var id;
		var target;
		var no;

		e = e || window.event;
		target = e.target || e.srcElement;
		id = target.getAttribute("id");
		no = Number(id.substr(1));
		e.preventDefault();
	},
	
	dragend : function(e) {
		var id;
		var target;
		var no;

		e = e || window.event;
		target = e.target || e.srcElement;
		id = target.getAttribute("id");
		no = Number(id.substr(1));
		e.preventDefault();
		deck.display();
	},
	
	drop : function(e) {
		var id;
		var target;
		var no;
		var old_pos;

		e = e || window.event;
		target = e.target || e.srcElement;
		id = target.getAttribute("id");
		no = Number(id.substr(1));
		e.preventDefault();
		old_pos = Number(e.dataTransfer.getData("text"));

		deck.displace(old_pos, no);
		deck.display();
	},

	undo : function() {
		deck.undo();
	}

}

//-----------------------------------------------------------------------------
// ALL START HERE
//-----------------------------------------------------------------------------

function init() {
	var i;

	document.getElementById("c-1").addEventListener("dragover", ui.dragover, false);
	document.getElementById("c-1").addEventListener("drop", ui.drop, false);

	for(i=0; i<52; i++) {
		document.getElementById("c" + i).addEventListener("click", function(){
            doubleclick(this, ui.markCard, ui.cutDeck);
		});
		document.getElementById("c" + i).addEventListener("dragstart", ui.dragstart, false);
		document.getElementById("c" + i).addEventListener("dragover", ui.dragover, false);
		document.getElementById("c" + i).addEventListener("drop", ui.drop, false);
		document.getElementById("c" + i).addEventListener("dragend", ui.dragend, false);
	}

	document.getElementById("anti_faro_in").addEventListener("click", ui.anti_faro_in, false);
	document.getElementById("anti_faro_out").addEventListener("click", ui.anti_faro_out, false);
	document.getElementById("faro_in").addEventListener("click", ui.faro_in, false);
	document.getElementById("faro_out").addEventListener("click", ui.faro_out, false);
	document.getElementById("reverse").addEventListener("click", ui.reverse, false);
	document.getElementById("shuffle").addEventListener("click", ui.shuffle, false);
	document.getElementById("undo").addEventListener("click", ui.undo, false);

	document.getElementById("reOrder").addEventListener("click", ui.setReOrderUI, false);
	document.getElementById("cancel").addEventListener("click", ui.setMainUI, false);

	document.getElementById('file').addEventListener('change', ui.file, false);
	document.getElementById("save").addEventListener("click", ui.save, false);
	document.getElementById("read").addEventListener("click", function() {
		window.document.getElementById("file").click();
	});

	["bicycle", "siStebbins", "tamariz", "stay", "aronson", "joyal", "osterlind", "nikola", "eight_kings"]
		.forEach(function(order) {
			document.getElementById(order).addEventListener("click", function() {
				ui.reOrder(order);
		}, false);
	});

	deck.init();
	deck.display();
}

//----------------------------------------------------------------------------
// FUNCTION TO SET CALLBACK ON CLICK / DOUBLECLICK ON ELEMENT
//----------------------------------------------------------------------------

var doubleclick = function (el, onsingle, ondouble) {
    if (el.getAttribute("data-dblclick") == null) {
        el.setAttribute("data-dblclick", 1);
        setTimeout(function () {
            if (el.getAttribute("data-dblclick") == 1) {
                onsingle(el);
            }
            el.removeAttribute("data-dblclick");
        }, 300);
    } else {
		el.removeAttribute("data-dblclick");
		ondouble(el);
    }
};
