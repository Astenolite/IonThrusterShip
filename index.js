//solar panel data:
const solarPanelAreaWeight = (6*13.7)/325 //	kg/m^2	how much does one m^2 of solar panels weigh
const solarPanelProductionArea = 0.36/(2.7*2.7) //	kW/m^2	how much does one m^2 of solar panels generate

//thruster data:
const thrsterFuelConsumptionThrust = 1/189333 //	kg/Ns	how much fuel does the thruster consume per N of thrust per second
const thrusterElectrictyConsumptionThrust = 100 //		kW/Ns	how much electricty does the thruster consume per N of thrust per second
const thrusterMassThrust = 0.5 //	kg/Ns	how much mass do the thrusters take up per N of thrust per second

//travel data
//distance from Mars to Phobos = 9376000m
//distance from Mars to Deimos = 23460000m
//distance from earth to moon = 384400000m

let distanceAux = 150000000 * 1000;
let solarPanelAreaAux = 1000;
let totalFuelAux = 10000;
let massCargoAux = 100000;
let massMiningEquipmentAux = 1000;

function submitInputs() {
  // Get the values from all input boxes
  let distance = parseFloat(document.getElementById("input1").value)*1000;
  let solarPanelArea = parseFloat(document.getElementById("input2").value);
  let totalFuel = parseFloat(document.getElementById("input3").value);
  let massCargo = parseFloat(document.getElementById("input4").value);
  let massMiningEquipment = parseFloat(document.getElementById("input5").value);

  if(isNaN(distance))
    distance = distanceAux;
  if(isNaN(solarPanelArea))
    solarPanelArea = solarPanelAreaAux;
  if(isNaN(totalFuel))
    totalFuel = totalFuelAux;
  if(isNaN(massCargo))
    massCargo = massCargoAux;
  if(isNaN(massMiningEquipment))
    massMiningEquipment = massMiningEquipmentAux;


  let solarPanelProduction = (solarPanelArea * solarPanelProductionArea);
	let maximumPossibleThrust = (solarPanelProduction / thrusterElectrictyConsumptionThrust);
  let massSolarPanels = (solarPanelArea * solarPanelAreaWeight);

  document.getElementById("SP-INFO-solarPanelMass").querySelector("#data").innerHTML = massSolarPanels.toFixed(5);
  document.getElementById("SP-INFO-solarPanelProduction").querySelector("#data").innerHTML = solarPanelProduction.toFixed(5);
  document.getElementById("SP-INFO-maximumThrust").querySelector("#data").innerHTML = maximumPossibleThrust.toFixed(5);


  let massThrusters =(maximumPossibleThrust * thrusterMassThrust);
  let massEmptyShip = massSolarPanels + massThrusters + massMiningEquipment;

  document.getElementById("SM-INFO-solarPanelMass").querySelector("#data").innerHTML = massSolarPanels.toFixed(5);
  document.getElementById("SM-INFO-thrusterMass").querySelector("#data").innerHTML = massThrusters.toFixed(5);
  document.getElementById("SM-INFO-miningEquipmentMass").querySelector("#data").innerHTML = massMiningEquipment.toFixed(5);
  document.getElementById("SM-INFO-totalMass").querySelector("#data").innerHTML = massEmptyShip.toFixed(5);


  let A = massCargo;
  let B = totalFuel;
	let C = massEmptyShip;

	let minimumTime = (2 * (Math.sqrt((A + C) * (B + C)) + C) + A + B)/B
  minimumTime *= (distance * thrsterFuelConsumptionThrust);
  minimumTime /= (3600 * 24);
  let aux = (B / (A - B)) * Math.sqrt((A + C) * (B + C)); 
  let X = (-B * aux + A * aux - B * B - B * C)/(A - B); 
  

  console.log("f(" + X + ") = " + minimumTime);


  X = 3000;
  let speed1 = X/(thrsterFuelConsumptionThrust * (massEmptyShip + totalFuel - X + X/2));
  let speed2 = (totalFuel- X)/(thrsterFuelConsumptionThrust * (massEmptyShip + massCargo + (totalFuel-X)/2));
  let time1 = (distance/speed1)/(3600*24)
  let time2 = (distance/speed2)/(3600*24);

  console.log(distance + " "+ speed1 + " " + distance/speed1);
  console.log("maximum speed going: " + speed1);
  console.log("maximum speed returning: " + speed2);

  document.getElementById("SJ-INFO-estimatedTime-trip2").querySelector("#data").innerHTML = time2.toFixed(5);
	document.getElementById("SJ-INFO-estimatedTime-trip1").querySelector("#data").innerHTML = time1.toFixed(5);
  document.getElementById("SJ-INFO-estimatedTime").querySelector("#data").innerHTML = minimumTime.toFixed(5);
}