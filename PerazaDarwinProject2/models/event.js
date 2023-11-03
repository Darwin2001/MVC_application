const { DateTime } = require('luxon');
const {v4:uuidv4} = require('uuid');

const events = [
    {
        id : '1',
        category: 'Pokemon-Go',
        title : 'Looking for a 4th to help on a Mega Rayquaza raid',
        host_name: 'Darwin Peraza',
        start_date: '2023/10/7 10:00 AM',
        end_date: '2023/10/7 5:00 PM',
        location: 'Woodward Hall, UNCC',
        details : "A buddy and I are going to go around UNCC and fight some Mega Rayquaza raids, We currently have 3 just looking for the 4th to make this a raid night to remember.",
        image: '/images/megaRay.png'
    },
    {
        id: '2',
        category: 'Pokemon-Go',
        title: 'Looking for another Player to raid/gym tommorow',
        host_name: 'Andrew Yang',
        start_date: '2023/10/8 8:00 AM',
        end_date: '2023/10/8 3:00 PM',
        location: 'Student Union',
        details: 'Wanted to do some gyms and raids, must be team Mystic, rep blue forever',
        image : '/images/raids.jpg'
    },
    {
        id : '3',
        category: 'Pokemon-Go',
        title: 'Need more people for the Mega Mawile raid, the more the merrier',
        host_name: 'Ethan Johnson',
        start_date: '2023/10/7 5:00 PM',
        end_date : '2023/10/7 7:00 PM',
        location : 'Belk Gym',
        details: 'Need some more people to help take down Mega Mawile, was thinking do a couple raids and maybe rendevous at the Wendys on campus',
        image : '/images/megaMawile.png'
    },
    {
        id: '4',
        category: 'Pokemon-Go',
        title : 'Team Instinct takeover day, come join us as we paint the campus yellow',
        host_name: 'Seth LaMay',
        start_date: '2023/10/9 9:00 AM',
        end_date: '2023/10/9 1:00 PM',
        location: 'Bioinformatics building',
        details: 'Have to be on team intinct, come join as we paint the town yellow and completely roll over campus.',
        image: '/images/teamInstinct.jpg'
    }
    ,
    {
        id: '5',
        category: 'SSBU',
        title: 'Practice Partner for Smash Ultimate',
        host_name : 'Zay Flowers',
        start_date: '2023/10/8 11:00 AM',
        end_date: '2023/10/8 3:00 PM',
        location: 'Gamer lab in Student Union',
        details: 'Wanted to practice my main against some people in between my classes. I play Joker down for any kind of matchup with tournament rules',
        image : '/images/joker.jpg'
    },
    {
        id: '6',
        category: 'SSBU',
        title : 'Looking for doubles mate, SSBU',
        host_name: 'Odell Beckham Jr.',
        start_date: '2023/10/8 8:00 AM',
        end_date: '2023/10/15 8:00 AM',
        location : 'Bank of America Stadium',
        details : 'Looking for partner in state tourney coming to town, need to find a doubles mate by the 15th. I main kirby down to play with any other main',
        image : '/images/kirby.jpg'
    },
    {
        id : '7',
        category : 'SSBU',
        title: 'Arraging tournament, need 3 more for Smash Ultimate',
        host_name : 'Smithers',
        start_date : '2023/10/17 6:00 PM',
        end_date : '2023/10/17 11:00 PM',
        location : 'Gamestop at the Arboretum on Independence',
        details : 'Arraging a tournament at my local gamestop, need 3 more people to have a complete roster. No entry free, any skill level welcome. Prize of $50 reward.',
        image : '/images/gamestop.jpg'
    }
]

exports.find = () => events;
exports.findById = id => events.find(event => event.id == id);
exports.save = function(event){
    event.id = uuidv4();
    events.push(event);
}
exports.updateById  = function(id, newEvent){
    let event = events.find(event => event.id == id);
    if(event){
        event.title = newEvent.title;
        event.content = newEvent.content;
        return true;
    }
    else{
        return false;
    }
}
exports.deleteById = function(id){
    let index = events.findIndex(event => event.id === id);
    if(index !== -1){
        events.splice(index, 1);
        return true;
    }
    else{
        return false;
    }
}