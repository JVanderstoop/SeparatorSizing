class Calculator {
    static pi = Math.PI;
    static basePressure = 101.325;
    static baseTempKelvin = 288.15;

    constructor(inputs) {
        this.gasRatePerSecond = inputs.gasRate / (24 * 60 * 60);
        this.oilRatePerMinute = inputs.oilRate / (24 * 60);
        this.waterRatePerMinute = inputs.waterRate / (24 * 60);
        this.E5 = inputs.gasMW / 28.965;
        this.separatorPressureKPA = inputs.separatorPressure + Calculator.basePressure;
        this.separatorTempKelvin = inputs.separatorTemperature + 273.15;
        this.vesselInnerDiameter = inputs.separatorDiameter - (2 * inputs.wallThickness);
        this.vesselCrossSectionArea = 0.25 * Calculator.pi * Math.pow((this.vesselInnerDiameter / 1000), 2);
        this.gasRate = (inputs.gasRate / 23.6) * inputs.gasMW;
        this.oilRate = inputs.oilRate * inputs.oilDensity;
        this.waterRate = inputs.waterRate * inputs.waterDensity;
        this.emulsionDensity = (this.oilRate + this.waterRate) / (inputs.oilRate + inputs.waterRate);
        this.gasCompressabilityReference = this.compressability(this.E5, Calculator.basePressure, Calculator.baseTempKelvin, 1);
        this.gasCompressabilitySeparator = this.compressability(this.E5, this.separatorPressureKPA, this.separatorTempKelvin, 2);
        this.gasDensitySeparator = (inputs.gasMW * this.separatorPressureKPA) / (8.3145 * this.separatorTempKelvin * this.gasCompressabilitySeparator);
        this.QgSeparator = this.gasRate / this.gasDensitySeparator;
        this.Ks = 0.116152 + 0.00000226 * this.separatorPressureKPA;
        this.Vgmax = this.Ks * Math.pow(((inputs.oilDensity - this.gasDensitySeparator) / this.gasDensitySeparator), 0.5);
        this.gasVelocityInVessel = (this.gasRatePerSecond * (Calculator.basePressure / this.separatorPressureKPA) * (this.separatorTempKelvin / Calculator.baseTempKelvin) * (this.gasCompressabilitySeparator / this.gasCompressabilityReference)) / this.vesselCrossSectionArea;
        this.sealLayerHeighAboveHCOutlet = 300;
        this.vesselOilVolume = ((inputs.HLSDElevation - (inputs.HCOutletElevation + 0.5 * inputs.HCOutletOuterDiameter + this.sealLayerHeighAboveHCOutlet)) / 1000) * this.vesselCrossSectionArea;
        this.oilRetentionTime = this.vesselOilVolume / this.oilRatePerMinute;
        this.sealLayerHeightAboveWaterOutlet = 300;
        this.vesselWaterVolume = (((inputs.HCOutletElevation - (0.5 * inputs.HCOutletOuterDiameter)) - (inputs.waterOutletElevation + (0.5 * inputs.waterOutletOuterDiameter) + this.sealLayerHeightAboveWaterOutlet)) / 1000) * this.vesselCrossSectionArea;
        this.waterRetentionTime = this.vesselWaterVolume / this.waterRatePerMinute;
        this.inletNozzleMixtureDensity = ((this.gasRate + this.oilRate + this.waterRate) / (inputs.oilRate + inputs.waterRate + this.QgSeparator));
        this.inletNozzleArea = 0.25 * Calculator.pi * Math.pow((inputs.vesselInletInnerDiameter / 1000), 2);
        this.inletNozzleMixtureVelocity = (inputs.oilRate + inputs.waterRate + this.QgSeparator) / (24 * 60 * 60) / this.inletNozzleArea;
        this.inletNozzlePV = this.inletNozzleMixtureDensity * Math.pow(this.inletNozzleMixtureVelocity, 2);
        this.outletNozzleArea = 0.25 * Calculator.pi * Math.pow((inputs.gasOutletInnerDiameter / 1000), 2);
        this.outletNozzleVapourVelocity = this.QgSeparator / (24 * 60 * 60) / this.outletNozzleArea;
        this.outletNozzlePV = this.gasDensitySeparator * Math.pow(this.outletNozzleVapourVelocity, 2);
        this.liquidOutletNozzleArea = 0.25 * Calculator.pi * Math.pow((inputs.waterOutletInnerDiameter / 1000), 2);
        this.liquidOutletNozzleVelocity = (inputs.oilRate + inputs.waterRate) / (24 * 60 * 60) / this.liquidOutletNozzleArea;
    }

    compressability(I5, I6, I7, z) {
        const I10 = 8.3145;
        const I11 = 0.08;
        const e = Math.E;
        const I14 = 269.5454 * Math.pow(I5, 0.5783);
        const I15 = (-50.1578 * Math.pow(e, (I5 * 1.53848))) + (4773.4124 * Math.pow(e, (I5 * -0.0061679)));
        const I16 = I7 / I14;
        const I18 = 0.45724 * Math.pow(I10, 2) * Math.pow(I14, 2) / I15;
        const I19 = 0.0778 * I10 * I14 / I15;
        const I20 = Math.pow(1 + (0.37464 + 1.54226 * I11 - 0.26992 * Math.pow(I11, 2)) * (1 - Math.pow(I16, 0.5)), 2);
        const I21 = I18 * I20 * I6 / (Math.pow(I10, 2) * Math.pow(I7, 2));
        const I22 = I19 * I6 / (I10 * I7);
        let ztable = new Array(11).fill(null).map(() => new Array(3).fill(0));

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 3; j++) {
                if (i === 0 && j === 0) {
                    ztable[0][0] = 1.1;
                } else if (j === 0) {
                    ztable[i][j] = ztable[i - 1][0] - (ztable[i - 1][1] / ztable[i - 1][2]);
                } else if (j === 1) {
                    ztable[i][j] = Math.pow(ztable[i][0], 3) - (1 - I22) * Math.pow(ztable[i][0], 2) + (I21 - 3 * Math.pow(I22, 2) - 2 * I22) * ztable[i][0] - (I21 * I22 - Math.pow(I22, 2) - Math.pow(I22, 3));
                } else if (j === 2) {
                    ztable[i][j] = 3 * Math.pow(ztable[i][0], 2) - 2 * (1 - I22) * ztable[i][0] + (I21 - 3 * Math.pow(I22, 2) - 2 * I22);
                }
            }
        }

        let smallestZ = 1.1;
        for (let i = 0; i < 11; i++) {
            if (ztable[i][0] < smallestZ) {
                smallestZ = ztable[i][0];
            }
        }

        return smallestZ;
    }
}

module.exports = Calculator;