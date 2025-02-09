import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./BasicSelect.css";
import EmissionsChart from "./EmissionChart";
import { excavatingTools, electricEquipment } from "./tool.js";

export default function BasicSelect() {
  const [selectedTool, setSelectedTool] = useState("");
  const [electricTool, setElectricTool] = useState("");
  const [coalAmount, setCoalAmount] = useState("");
  const [reduction, setReduction] = useState("");
  const [emissions, setEmissions] = useState(0);
  const [fuelConsumption, setFuelConsumption] = useState("");
  const [fuelEmission, setFuelEmission] = useState(0);
  const [hoursImplemented, setHoursImplemented] = useState("");
  const [total, setTotal] = useState(0);
  const [fuelOfTransport, setFuelOfTransport] = useState("");
  const [distanceTravelled, setDistanceTravelled] = useState("");
  const [transportEmission, setTransportEmission] = useState(0);
  const [power, setPower] = useState("");
  const [time, setTime] = useState("");
  const [energy, setEnergy] = useState(0);
  const [employees, setEmployees] = useState("");
  const [capitaEmissions, setCapitaEmissions] = useState(null);
  const [finalEmission, setFinalEmission] = useState(0);
  const [chartType, setChartType] = useState("individual"); // State for toggling chart type

  const calculateEnergy = () => {
    const P = parseFloat(power) || 0;
    const t = parseFloat(time) || 0;
    const energyKWh = (P * t) / 1000;
    const equipment = electricEquipment.find(
      (tool) => tool.name === electricTool
    );
    if (equipment) {
      const EF = equipment.emissionFactor;
      const equipmentUsage = energyKWh * EF;
      setEnergy(equipmentUsage);
    }
  };

  const calculateEmissions = () => {
    const tool = excavatingTools.find((tool) => tool.name === selectedTool);
    if (tool) {
      const EF = tool.emissionFactor;
      const A = parseFloat(coalAmount) || 0;
      const ER = parseFloat(reduction) || 0;
      const H = parseFloat(hoursImplemented) || 0;
      const F = parseFloat(fuelConsumption) || 0;

      const excavationEmission = A * EF * H * (1 - ER / 100);
      const fuelEmissions = EF * F;

      setEmissions(excavationEmission);
      setFuelEmission(fuelEmissions);

      const totalEmissions = excavationEmission + fuelEmissions;
      setTotal(totalEmissions);
    }
  };

  const calculateTransportEmission = () => {
    const fuel = parseFloat(fuelOfTransport);
    const transportEmission = fuel * 2.67;
    setTransportEmission(transportEmission);
  };

  const calculatePerCapitaEmission = () => {
    const totalEmissions = total;
    const transportEmissions = transportEmission;
    const electricEmissions = energy;
    const employeeCount = parseFloat(employees) || 0;

    if (employeeCount > 0) {
      const capitaEmission =
        (totalEmissions + transportEmissions + electricEmissions) /
        employeeCount;
      setCapitaEmissions(capitaEmission);
    } else {
      setCapitaEmissions(0);
    }
  };

  const calculateTotalEmissions = () => {
    const Emission = total || 0;
    const transportEmissions = transportEmission || 0;
    const energyEmissions = energy || 0;
    const capitaEmission = capitaEmissions || 0;

    const totalMonthlyEmissions =
      Emission + transportEmissions + energyEmissions + capitaEmission;
    setFinalEmission(totalMonthlyEmissions);
  };

  const calculateAll = () => {
    calculateEmissions();
    calculateTransportEmission();
    calculateEnergy();
    calculatePerCapitaEmission();
    calculateTotalEmissions();
  };

  return (
    <Box sx={{ minWidth: 120 }} style={{padding:"2rem"}}>
      {/* Form fields */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Excavation Tool</InputLabel>
            <Select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
            >
              {excavatingTools.map((tool) => (
                <MenuItem key={tool.name} value={tool.name}>
                  {tool.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Electric Tool</InputLabel>
            <Select
              value={electricTool}
              onChange={(e) => setElectricTool(e.target.value)}
            >
              {electricEquipment.map((tool) => (
                <MenuItem key={tool.name} value={tool.name}>
                  {tool.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Coal Amount (tons)"
            value={coalAmount}
            onChange={(e) => setCoalAmount(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Reduction Percentage (%)"
            value={reduction}
            onChange={(e) => setReduction(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Hours worked (excavation tool)"
            value={hoursImplemented}
            onChange={(e) => setHoursImplemented(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Fuel Consumption (excavation tool in litre/gallon)"
            value={fuelConsumption}
            onChange={(e) => setFuelConsumption(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Fuel of Transport vehicle (litre/gallon)"
            value={fuelOfTransport}
            onChange={(e) => setFuelOfTransport(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Distance (km)"
            value={distanceTravelled}
            onChange={(e) => setDistanceTravelled(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Electric Tool Power (w)"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Electric Tool Time (hr)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Number of Employees"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      {/* Toggle buttons */}
      <Box mt={4} className="graph-btns">
        <Button
          variant="outlined"
          onClick={() => {
            calculateAll();
            setChartType("individual");
          }}
        >
          Show Individual Emissions
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            calculateAll();
            setChartType("total");
          }}
          sx={{ ml: 2 }}
        >
          Show Total Monthly Emissions
        </Button>
      </Box>

      {/* Display chart */}
      <Box mt={4}>
        <EmissionsChart
          emissionsData={{
            individual: [
              total,
              transportEmission,
              energy,
              capitaEmissions || 0,
            ],
            total: [finalEmission],
          }}
          type={chartType}
        />
      </Box>
    </Box>
  );
}
