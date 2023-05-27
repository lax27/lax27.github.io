let game_data;
let current_room = 0;
let items_picked = [];


function terminal_out (info){
let terminal = document.getElementById("terminal");
terminal.innerHTML += info;
terminal.scrollTop = terminal.scrollHeight;
}

function paraseComand(comand){
console.log("El comando", comand);
switch (comand){
	case "ver":
		terminal_out("<p>"+game_data.rooms[current_room].description+"</p>");
	break;
	
	case 'ir':
							
		let doors = "";
		let doors_num = game_data.rooms[current_room].doors.length;
						
		for (let i = 0; i < doors_num; i++) {
			doors += game_data.rooms[current_room].doors[i] + " ";
		}
							
		terminal_out("<p>Puedes ir a: " + doors + ",</p>");
							
		break;
	
	
	default:
		terminal_out("<p>"+comand+" Comando no encontrado</p>");
	break;
 }
}

function getDoorNumber(door){
	let doors_num = game_data.doors.length;
	
	for (let i = 0; i < doors_num; i++) {
		if (game_data.doors[i].id == door) {
			return i;
		}
	}
	return -1;
}
	
function getRoomNumber (room){
	let rooms_num = game_data.rooms.length;
	
	for (let i = 0; i < rooms_num; i++) {
		if (game_data.rooms[i].id == room) {
			return i;
		}
	}
	
	return -1;
}

function getItemNumber (item) {
	let items_num = game_data.items.length;
	
	for (let i = 0; i < items_num; i++) {
		if (game_data.items[i].id == item) {
			return i;
		}
	}
	
	return -1;
}

function paraseInstruction(instruction){
console.log("La instrucion", instruction);
	switch (instruction[0]){

	case 'ver':
		
			let item_number = getItemNumber(instruction[1]);
			
			if (item_number < 0) {
				terminal_out("<p>El item<strong> " + instruction[1] + "</strong> no se encuentra en la zona</p>");
				return;
			}
			
			let item_description = game_data.items[item_number].description;
			
			terminal_out("<p><strong>" + instruction[1] + ":</strong> " + item_description + "</p>");
			
			break;
			
	case 'ir':
			
			let door_number = getDoorNumber(instruction[1]);
			
			if (door_number < 0) {
				console.log("Puerta errónea");
				return;
			}
			
			let room_number = getRoomNumber(game_data.doors[door_number].rooms[0]);
			
			if (room_number == current_room) {
				current_room = getRoomNumber(game_data.doors[door_number].rooms[1]);
			}
			else {
				current_room = room_number;
			}
			
			let next_room_name = game_data.rooms[current_room].name;
			
			terminal_out("<p>Cambiando de habitación a " + next_room_name + "</p>");
			
			break;


		default:
			terminal_out("<p>"+comand+" Comando no encontrado</p>");
		break;
	}
}

function readAction(){
let instruction = document.getElementById("comand").value;
let instruction_trim = instruction.trim();
let data = instruction_trim.split(" ");

if (data.length == 0 || instruction_trim == ""){
document.getElementById("terminal").innerHTML += "<p><strong>Error</strong>: escribe una instrucion</p>";
return;
}
if(data.length == 1){
paraseComand(data[0]);
}
else {
paraseInstruction(data);
}
}

function game (data){
game_data = data;

document.getElementById("terminal").innerHTML = "<p><strong>¡Bienvenidos a DarkIkea!</strong> El juego de terror definitivo</p>";
document.getElementById("terminal").innerHTML +="<p>Te encuentras en "+game_data.rooms[current_room].name+". ¿que quieres hacer?</P>";
}
fetch("https://lax27.github.io/game.json").then(response => response.json()).then(data => game(data));
