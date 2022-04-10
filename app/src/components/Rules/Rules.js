import React, {useEffect} from 'react';

const intro = 'Original board game rules can be found '

const Rules = ({setShowRules}) => {

    useEffect(() => {
		setShowRules(false)
	}, [setShowRules])
	
    return(
		<div className='ph7'>
            <h1 className= 'title'>Basic Rules / Game Play:</h1>
                <br/>
            {intro}
                <a href="https://www.ultraboardgames.com/letter-jam/game-rules.php" 
                    target="_blank" 
                    rel="noreferrer" 
                    className='link dim black underline pointer'>
                    here.
                </a>
            <h4>Game Setup</h4>
            <p>
                Players will choose a word; that word will be shuffled and passed to the player "on the right". 
                Heads up this app does not check spelling for you (just like the IRL game) and this gives you 
                flexibility to play with lewd or 'modern' words if you want.<br/></p>
            <h4>Giving Clues</h4>    
                <p>Everyone will be able to see a letter from each other player; see if you can spell a word using the letters 
                you can see. Letters can be used more than once and the wildcard can be used to represent one letter. If the 
                letter appears more than once in the word, you use the wildcard multiple times but you cannot use it to represent 
                two different letters in the same word. The cluegiver is not allowed to say what letter the wildcard represents. 
                Players discuss their potential clues to see who has the best one. All players choose the clue giver together and 
                the person selected should click the Give Clue button. The clue can be up to 8 letters long. <br/>
                <br/>
                When discussing clues you can say:
            </p>
            <ul>
                <li>How many letters are in your clue.</li>
                <li>How many players it helps, but not which ones.</li>
                <li>How many bonus letters it uses, but not which ones.</li>
                <li>Whether it uses the wildcard.</li>
            </ul>
            <p>Don't say:</p>
            <ul>
                <li>"This helps everyone but Lisa"</li>
                <li>"My clue is sort of obscure"</li>
                <li>"You two have the same letter!"</li>
                <li>"I see nothing but vowels"</li>
                <li>"I use that letter twice".</li>
                <li>"Paul's letter is hard to use"</li>
            </ul>
            <p>
                The flower on the right side of the screen tracks the number of clues that are available to the team. 
                There is one red token for each player plus green tokens that can be used by any player. The token in 
                the center of the flower surrounded by red tokens is only available once all the red tokens are gone 
                (once each player has given a clue), but the green tokens on the leaves are available immediately. When
                a player gives a clue a token is removed from the flower. You can see how many clues you've given 
                under your current card.<br/></p>
                <h4>Receiving Clues</h4>
                <p>
                Clues that you received are shown on the right hand side of the screen. Your letter is represented by 
                a ? and the card number in the brackets indicate which card the clue was for. If you think you know what
                your letter is, click the next card button. Late in the game, some players will run out of letter cards.
                On your last card if you click the button that says "I know all my letters" you will receive a random 
                letter card that others will be able to see and use when they give out clues. When someone uses this 
                extra letter in a clue, you can try to guess it. If you guess correctly, it becomes a bonus letter and 
                is permanently available to everyone to use in clues. If you are wrong it will be discarded and you'll 
                get a new letter</p>
                <h4>Ending the Game</h4>
                <p>
                The game is over when all clues are used up or when all players think they know all their letters. A pop 
                up will appear and ask you to guess your word; unscramble your letters and submit what you think it is.
                The score is a collective score, if you guess your word (or an anagram of your word!) correctly you get 
                3x the length of the word in points plus a point for every green token that remains in the flower. Try 
                to beat your own high score!<br/>
                <br/>
            </p>
		</div>
	)
}
export default Rules;
