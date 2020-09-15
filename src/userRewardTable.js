import React from 'react';

function UserRewardTable(props) {
  const { userData } = props;

  const getRewardWiseTable = (data) => {
      const getReward = (amt) => {
        const amount = parseInt(amt, 10);
        let moreFiftyReward = 0;
        let moreHundredReward = 0
        if(amount/100 >= 1) {
            moreHundredReward = (amount-100) * 2;
        }
        if(amount/50 >= 1) {
            moreFiftyReward = (amount >= 100) ? 50 : (amount-50);
        }
        return {
            moreHundredReward,
            moreFiftyReward,
            totalRewards: moreFiftyReward + moreHundredReward,
        }
      }
      const updatedData = data.map(singleRow => {
        const rewardObj = getReward(singleRow.paidAmount);
          return { ...singleRow, ...rewardObj }
      })
      const threeMonthsTotalReward = updatedData.reduce((total, currentValue) => {
        return total + currentValue.totalRewards;
      }, 0);
      return {
          tableData: updatedData,
          threeMonthsTotalReward: threeMonthsTotalReward,
      }
  }

  if(!userData) { return null }
  const { tableData, threeMonthsTotalReward } = getRewardWiseTable(userData);
  return (
      <div className="reward-table">
        <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Paid Amount</th>
                <th>Reward</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((dateWiseData, i) => {
                return (
                    <tr key={dateWiseData.date}>
                    <td>{dateWiseData.date}</td>
                    <td>${dateWiseData.paidAmount}</td>
                    <td title={`MoreFiftyReward: ${dateWiseData.moreFiftyReward} MoreHundredReward: ${dateWiseData.moreHundredReward}`}>{dateWiseData.totalRewards}</td>
                    </tr>
                )
                })}
            </tbody>
            <tfoot>
                <tr>
                <th>Total Rewards</th>
                <th></th>
                <th>{threeMonthsTotalReward}</th>
                </tr>
            </tfoot>
        </table>
    </div>
  );
}

export default UserRewardTable;
