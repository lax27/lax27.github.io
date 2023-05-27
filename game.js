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
							
			terminalOut("<p>Puedes ir a: " + doors + "</p>");
							
			break;
							
		case 'coger':
			
			let itmes = "";
			let items_num = game_data.rooms[current_room].items.length;
			
			for (let i = 0; i < items_num; i++){
				items += game_data.rooms[current_room].items[i] + " ";
			}
			
			terminalOut("<p>Los items en la sala son: " + items + "</p>");
			
			break;
							
		default:
			terminalOut("<p><strong>ERROR:</strong> Comando <strong>" + command + "</strong> no encontrado</p>");
 }
}

function getDoorNumber(door){
	for (let i = 0; i < game_data.doors.length; i++){
		if ( game_data.doors[i].id == door){
			return i;
		}
	}
	return -1;
}
	
function getRoomNumber (room){
for	(let i = 0; i < game_data.rooms.length;i++){
if (game_data.rooms[i].id == room){
		return i;
		}
	}
	return -1;
}


function paraseInstruction(instruction){
console.log("La instrucion", instruction);
	switch (instruction[0]){
		case 'ver':
			let item_number = findItemNumber(instruction[1]);

			if (item_number < 0) {
				console.log("Item erróneo");
				return;
			}
			
			let item_description = game_data.items[item_number].description;
			
			terminalOut("<p><strong>" + instruction[1] + ":</strong> " + item_description + "</p>");
			
			break;
						
		case 'ir':
						
			let door_number = findDoorNumber(instruction[1]);
						
			if (door_number < 0) {
				console.log("Puerta errónea");
				return;
			}
						
			let room_number = findRoomNumber(game_data.doors[door_number].rooms[0]);
			let next_room_name = "";
							
			if (room_number == current_room) {
				current_room = findRoomNumber(game_data.doors[door_number].rooms[1]);
			}
							
			else {
				current_room = room_number;
			}
							
			next_room_name = game_data.rooms[current_room].name
							
			terminalOut("<p>Cambiando de habitación a " + next_room_name + "</p>");
						
			break;
						
		case 'coger':
		
			game_data.rooms[current_room].items.forEach(function (item) {
				if (item == instruction[1]) {
					
					let item_num = game_data.rooms[current_room].items.indexOf(item);
					
					if (item_num < 0) {
						console.log ("Error al borrar el item de la habitación");
						return;
					}
					
					item_num = game_data.items.indexOf(item);
					
					if (game_data.items[item_num].pickable == false) {
						terminalOut("<p>El objeto<strong> " + item + "</strong> no puedes ser cogido</p>");
						return;
					}
					
					item_num = game_data.rooms[current_room].items.indexOf(item);
					items_picked.push(item);
					game_data.rooms[current_room].items.splice(item_num, 1);
					
					terminalOut("<p>El objeto<strong> " + item + "</strong> ha sido añadido a tu inventario</p>");
					return;
				}
			});
					
			break;	
		default:
			terminalOut("<p><strong>ERROR:</strong> comand <strong>" + instruction[0] + "</strong> not found</p>");
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
