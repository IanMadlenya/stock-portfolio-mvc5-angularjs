//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System.Collections.Generic;

namespace AlgoTrader.Core.EntityFramework
{
    public partial class Security
    {
        public Security()
        {
            this.Portfolio_Security = new HashSet<Portfolio_Security>();
        }
    
        public System.Guid SecurityId { get; set; }
        public string Symbol { get; set; }
    
        public virtual ICollection<Portfolio_Security> Portfolio_Security { get; set; }
    }
}
