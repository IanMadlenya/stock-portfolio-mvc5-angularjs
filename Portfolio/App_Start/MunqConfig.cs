// --------------------------------------------------------------------------------------------------------------------
// <copyright file="MunqConfig.cs" company="">
//   
// </copyright>
// <summary>
//   The munq config.
// </summary>
// --------------------------------------------------------------------------------------------------------------------


using Portfolio.App_Start;
using WebActivator;

[assembly: PreApplicationStartMethod(typeof(MunqConfig), "PreStart")]

namespace Portfolio.App_Start
{
    using System.Web.Mvc;
    using Core.Services;
    using Core.Services.Interfaces;
    using Munq.MVC3;

    /// <summary>
    /// The munq config.
    /// </summary>
    public static class MunqConfig
    {
        #region Public Methods and Operators

        /// <summary>
        /// The pre start.
        /// </summary>
        public static void PreStart()
        {
            DependencyResolver.SetResolver(new MunqDependencyResolver());
            var c = MunqDependencyResolver.Container;

            c.Register<IYahooFinanceService, YahooFinanceService>();
        }

        #endregion
    }
}