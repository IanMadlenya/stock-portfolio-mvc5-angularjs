﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Services;
using Core.Services.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Test
{
    [TestClass]
    public class YahooFinanceServiceTests
    {
        private readonly IYahooFinanceService _yahooFinanceService = new YahooFinanceService();

        [TestMethod]
        public void GetStockData()
        {
            var marketData = _yahooFinanceService.GetData("MSFT", null, null);
            Assert.IsNotNull(marketData);
        }

        [TestMethod]
        public void GetOptionData()
        {
            var optionData = _yahooFinanceService.GetData("GOOG");
            Assert.IsNotNull(optionData);
        }
    }
}