const MinecraftCommand = require('../../contracts/MinecraftCommand')
const fetch = require('node-fetch');
const { PermissionOverwrites } = require('discord.js');

class BBCommand extends MinecraftCommand {
  onCommand(username, message) {
    try {
     
     
      fetch('https://api.hypixel.net/player?key=6e5847be-356d-44b7-a7ea-29ff26e12bd1&name='+message.toLowerCase().split(' ')[1])
      .then(response => response.json())
      .then(info => {
        var totalWins = info.player.stats.BuildBattle.wins
        var teamWins = info.player.stats.BuildBattle.wins_teams_normal
        if(teamWins==undefined){
          teamWins = '0'
        }
        var gtbWins = info.player.stats.BuildBattle.wins_guess_the_build
        if(gtbWins==undefined){
          gtbWins = '0'
        }
        var proWins = info.player.stats.BuildBattle.wins_solo_pro
        if(proWins==undefined){
          proWins = '0'
        }
        var score = info.player.stats.BuildBattle.score
        var soloWins = parseInt(totalWins)-parseInt(teamWins)-parseInt(gtbWins)-parseInt(proWins)


        var totalVotes = info.player.stats.BuildBattle.total_votes
        var games = info.player.stats.BuildBattle.games_played
        var totalGames = games
        games = games-gtbWins
        if (gtbWins>totalWins/3&&gtbWins<totalWins/1.7)
        {
          games = games-gtbWins*1.4
        }
        
        
        if(proWins>teamWins*2&&proWins>soloWins*2)
        {
          var pobvo= (totalVotes/games)/3
          console.log("1")
        }
        else if(proWins>teamWins*2&&proWins<soloWins*2)
        {
          var pobvo= (totalVotes/games)/4
          console.log("2")
        }
        else if(proWins<teamWins*2&&proWins>teamWins)
        {
          var pobvo= (totalVotes/games)/4
          console.log("3")
        }
        else if (proWins*2>teamWins&&proWins>soloWins)
        {
          var pobvo= (totalVotes/games)/4
          console.log("4")
        }
        else if (teamWins>proWins+soloWins)
        {
          var pobvo= (totalVotes/games)/8
          console.log("5")
        }
        if (teamWins>(proWins+soloWins)*1.7)
        {
          var pobvo= (totalVotes/games)/7
          console.log("6")
        }
        else if (soloWins>teamWins+proWins)
        {
          var pobvo= (totalVotes/games)/5
          console.log("7")
        }
        if (soloWins-teamWins>-300&&proWins>soloWins+teamWins)
        {
          var pobvo= (totalVotes/games)/8
          console.log("8")
        }
        
        if (proWins*2>teamWins&&soloWins>totalWins/2.2)
        {
          var pobvo= (totalVotes/games)/12
          console.log("9")
        }
        if (proWins*2>teamWins&&proWins>totalWins/2.2)
        {
          var pobvo= (totalVotes/games)/6
          console.log("10")
        }
        pobvo=Math.round(pobvo*100)
        if (pobvo>100)

        {
          pobvo=100
        }
        else if (games< 30)
        {
          var pobvo = "isnt accurate "
        }
        
        

        if(message.toLowerCase().split(' ')[1]=="fxcs")
        {
          pobvo = '100'
        }

        if(message.toLowerCase().split(' ')[1]=="ilyfart")
        {
          pobvo = '69 million'
        }



        this.send('/gc total: ' + totalWins + " team: " + teamWins + " solo: " + soloWins + " gtb: " + gtbWins 
        + " pro: " + proWins + " score: " + score + " pobvo: " + pobvo +"%"+" total games: "+ totalGames + " votes: "+totalVotes)
        this.minecraft.broadcastMessage('/gc total: ' + totalWins + " team: " + teamWins + " solo: " + soloWins + " gtb: " + gtbWins 
        + " pro: " + proWins + " score: " + score + " pobvo: " + pobvo +"%"+" total games: "+ totalGames + " votes: "+totalVotes)
      })       
    } catch (e)
    {
      console.log(e)
    }
  }
}




module.exports = BBCommand