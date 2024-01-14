//solar panel data:
const solarPanelAreaWeight = (6*13.7)/325 //	kg/m^2	how much does one m^2 of solar panels weigh
const solarPanelProductionArea = 0.36/(2.7*2.7) //	kW/m^2	how much does one m^2 of solar panels generate

//thruster data:
const thrsterFuelConsumptionThrust = 0.061 //	kg/Ns	how much fuel does the thruster consume per N of thrust per second
const thrusterElectrictyConsumptionThrust = 16.6 //		kW/Ns	how much electricty does the thruster consume per N of thrust per second
const thrusterMassThrust = 58.9 //	kg/Ns	how much mass do the thrusters take up per N of thrust per second

//travel data
//distance from Mars to Phobos = 9376000m
//distance from Mars to Deimos = 23460000m
//distance from earth to moon = 384400000m



function submitInputs() {
  // Get the values from all input boxes
  let distance = parseFloat(document.getElementById("input1").value)*1000;
  let solarPanelArea = parseFloat(document.getElementById("input2").value);
  let totalFuel = parseFloat(document.getElementById("input3").value);
  let massCargo = parseFloat(document.getElementById("input4").value);
  let massMiningEquipment = parseFloat(document.getElementById("input5").value);


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


  let M = massCargo - totalFuel;
	let N = totalFuel * massEmptyShip + totalFuel * totalFuel;
	let P = totalFuel;

	let minimumTime = 2 * Math.sqrt(N * (M * P + N)) + M * P + 2 * N;
	minimumTime /= (P * P);
	minimumTime *= thrsterFuelConsumptionThrust * distance;
	minimumTime /= (3600 * 24);


	document.getElementById("SJ-INFO-estimatedTime").querySelector("#data").innerHTML = minimumTime.toFixed(5);

}