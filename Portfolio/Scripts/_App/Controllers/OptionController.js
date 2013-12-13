﻿"use strict";

app.controller("OptionController", ["$scope", "autocompleteService", "toaster", "optionAnalysisService", "utilitiesService", function ($scope, autocompleteService, toaster, optionAnalysisService, utilitiesService) {

    $scope.btnRadioData = { selectedOpton: undefined }; // Allows single radio button only functionality.

    init();
    function init() {
        $scope.options = optionAnalysisService.getOptionData();
    }

    // Autocomplete
    $scope.symbols = [];
    $scope.OnInputChange = function () {
        $scope.symbols = autocompleteService.getSymbols($scope.selected);
    };

    $scope.SelectSymbol = function () {
        var symbol = $scope.selected.Symbol;
        $scope.loading = true;
        // First check if data already present in $scope.options else fire query.
        if (utilitiesService.isItemInArrayByProperty($scope.options, "symbol", symbol)) {
            toaster.pop("warning", "The options table for this symbol has already been retrieved.");
            $scope.loading = false;
        } else {
            // Option data for symbol not already persisted, so request data from service.
            getOptionData(symbol);
        }
    };

    // On select of dom radio button populate dom elements with option data for matching symbol.
    $scope.viewOptionData = function (symbol) {
        var persistedData = utilitiesService.findObjByKey($scope.options, "symbol", symbol);
        $scope.volatility = persistedData["data"][0].Volatility;
        $scope.currentOptionSet = persistedData["data"];
        $scope.filteredOptions = persistedData["data"];
        $scope.inTheMoney = false;
        $(window).resize();
    };

    // Get option data from service and persist. 
    function getOptionData(symbol) {
        var optionDataPromise = optionAnalysisService.getOptions(symbol);
        optionDataPromise.then(function (data) {
            if (data.length == 0) {
                toaster.pop("information", "No options found.", "Please try another symbol/company as not all companies have option listings");
                $scope.selected = undefined;
                $scope.loading = false;
                return;
            }
            $scope.options.push({ symbol: symbol, data: data });
            $scope.selected = undefined;
            $scope.loading = false;
        });
    }

    $scope.filterByInTheMoney = function () {
        if ($scope.inTheMoney) {
            $scope.filteredOptions = [];
            for (var i = 0; i < $scope.currentOptionSet.length; i++) {
                if ($scope.currentOptionSet[i].InTheMoney) {
                    $scope.filteredOptions.push($scope.currentOptionSet[i]);
                }
            }
        }
        if (!$scope.inTheMoney) {
            $scope.filteredOptions = $scope.currentOptionSet;
        }
    };

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.isVolatilityPopulated = function () {
        if ($scope.volatility > 0.0) return true;
        return false;
    };

    $scope.gridDataAvailable = function () {
        if ($scope.options.length > 0) return true;
        return false;
    };

    $scope.gridOptions = {
        data: "filteredOptions",
        filterOptions: $scope.filterOptions,
        enablePinning: true,
        enableColumnResize: true,
        columnDefs: [
            {
                field: "StrikePrice", displayName: "Strike", width: "10%",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "Symbol", width: "18%", cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "LastPrice", displayName: "Last", width: "5%",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "Change", width: "7%",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "Bid", width: "5%",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "Ask", width: "5%",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "Vol", width: "5%",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "OpenInt", width: "8%",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "DaysToExpiry", width: "5%", displayName: "DTE",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            },
            {
                field: "BlackScholes", displayName: "Black Scholes", width: "11%",
                cellTemplate: '<div ng-class="{optionGridRowInTheMoney: row.getProperty(\'InTheMoney\'), optionGridRowAtTheMoney: row.getProperty(\'AtTheMoney\')}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
            }
        ]
    };

    $scope.viewSelected = function () {
        if ($scope.btnRadioData.selectedOption != undefined) return true;
        return false;
    };

    $scope.RemoveFromList = function (idx, symbol) {
        utilitiesService.removeObjByKey($scope.options, "symbol", symbol);
        $scope.inTheMoney = false;
    };

}]);