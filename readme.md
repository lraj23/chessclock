# CCCC (Capa Chess Club Clock)

This project is a simple chess clock I created for the Chess Club at my school (which I run!).

You can select an initial time in hours, minutes, or seconds for white. After that, you can select the increment or delay time in minutes or seconds for white. Currently, however, you can only use increment, not delay. Basically every time it's your turn, your time increases by the increment.
You can either choose to use the same time control for black or you can choose a different custom one.

After selecting "Start Clock," the clock will start (... obviously), and White's time will start running out immediately.
Any time a player finishes their turn, they click space to end their turn. Every time their turn *starts*, their time increases by the increment (that means your time won't increase *until* the other player finishes their turn).

When someone runs out of time, the clock immediately disappears and is replaced by a message stating who ran out of time (**Note:** I used "ran out of time" and not "lost on time" because the game can end in a draw even if someone runs out of time) and also how much time (in seconds) the other player had left.

This clock is *JUST* about done except I need to add the option to use delay instead of increment (delay basically doesn't make your time run out UNTIL the delay time passes).