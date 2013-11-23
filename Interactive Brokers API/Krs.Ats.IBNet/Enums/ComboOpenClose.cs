// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ComboOpenClose.cs" company="">
//   
// </copyright>
// <summary>
//   Retail options are restricted to "SAME"
//   Institutional options may use "SAME", "OPEN", "CLOSE", "UNKNOWN"
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.ComponentModel;

namespace Krs.Ats.IBNet
{
    /// <summary>
    /// Retail options are restricted to "SAME"
    /// Institutional options may use "SAME", "OPEN", "CLOSE", "UNKNOWN"
    /// </summary>
    [Serializable()] 
    public enum ComboOpenClose : int
    {
        /// <summary>
        /// open/close leg value is same as combo
        /// This value is always used for retail accounts
        /// </summary>
        [Description("SAME")] Same = 0, 

        /// <summary>
        /// Institutional Accounts Only
        /// </summary>
        [Description("OPEN")] Open = 1, 

        /// <summary>
        /// Institutional Accounts Only
        /// </summary>
        [Description("CLOSE")] Close = 2, 

        /// <summary>
        /// Institutional Accounts Only
        /// </summary>
        [Description("UNKNOWN")] Unknown = 3
    }
}