//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Core.EntityFramework
{
    using System;
    using System.Collections.Generic;
    
    public partial class HistoricalStock
    {
        public System.Guid HistoricalStockId { get; set; }
        public string Symbol { get; set; }
        public string Exchange { get; set; }
        public System.DateTime Date { get; set; }
        public Nullable<decimal> Open { get; set; }
        public Nullable<decimal> High { get; set; }
        public Nullable<decimal> Low { get; set; }
        public decimal Close { get; set; }
        public decimal Volume { get; set; }
    }
}
