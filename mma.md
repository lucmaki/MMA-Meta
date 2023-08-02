---
title: MMA Meta
layout: base.njk
---
# Table of Contents
- [Introduction](#introduction)
- [Part 1: The MMA Meta](#part-1-the-mma-meta)
  - [An Overview](#an-overview)
  - [The Standing Game](#the-standing-game)
    - [Strikes vs Takedowns](#strikes-vs-takedowns)
    - [Nuances of Striking](#nuances-of-striking)
      - [Distance](#distance)
      - [Target](#target)
      - [Significance](#significance)
  - [The Ground Game](#the-ground-game)
    - [Strikes vs Submissions](#strikes-vs-submissions)
- [Part 2: Predicting Winners](#part-2-predicting-winners)
  - [Dataset Preparation](#dataset-preparation)
  - [Training](#training)
  - [Feature Selection](#feature-selection)
  - [Simplified Betting](#simplified-betting)
- [Conclusion](#conclusion)


# Introduction
MMA (Mixed Martial Arts) is a combat sport which allows most forms of attacks: punches, kicks, knees, elbows, takedowns, chokes, locks. Fighting continues even after dropping to the ground; until either the opponent gives up, is knocked out, or time runs out. The sport has thus earned a unique reputation as an evolving melting pot of martial arts; which tricks from various disciples sticks and which doesn't? 

So, how has the meta of MMA evolved over the decades? "Meta" is shorthand for the "metagame", which refers to common strategic methods and dominant playstyles. We base our analysis on the 2000-2022 range from a dataset of all [UFC matches](https://www.kaggle.com/datasets/danmcinerney/mma-differentials-and-elo), the sport's most popular promotion company.

Afterwards, we use feature selection to train a predictive model on all these match statistics, that predicts the winner of a match based on the past historical fight data of the two contestants.

Notes: 
- Graphs are clickable to open interactive versions.
- Given the blog is already long enough, we oversimply some things like grouping all weight classes together.

# Part 1: The MMA Meta

## An Overview
Before digging into specifics, let's check whether the meta has broadly changed over the years.

Through Primary Components Analysis (PCA), we perform dimension reduction to visualise the historical match data through 3 primary components (PC), i.e. the 3 directions of highest variance. The lighter the dot, the more recent the match.
{% include "graphs/pca_3d.html" %}
Older matches appear broadly more distant to newer matches, which indicates an evolution of the meta. 

Though, it is somewhat hard to see... so, let's just look at PC1, i.e. the main source of variance.  

<a href="#" onclick="window.open('/graphs/pca_1d.html', 'newwindow'); return false;"><img src="/imgs/pca_1d.png"></a>

There is a trend of match characteristics diverging towards a certain direction over the years. As for the range broadening over time, this is due to the increase in the number of UFC fights over time.

<a href="#" onclick="window.open('/graphs/fights_per_year.html', 'newwindow'); return false;"><img src="/imgs/fights_per_year.png"></a>

The UFC has increased in popularity, with a boom in number of fights past 2005, and stabilizing past 2015. Overall, having reached a 10x number of yearly matches since it's early days. 

Metas in games tends to develop faster through popularity; an acceleration in the search for what works and what doesn't through more participation. This would usually lead to higher competitiveness.

<a href="#" onclick="window.open('/graphs/fight_dur_and_strikes_landed_differentials_over_time.html', 'newwindow'); return false;"><img src="/imgs/fight_dur_and_strikes_landed_differentials_over_time.png"></a>

Indeed, competitiveness in the UFC has increased over time. Matches tend to be more even; with the difference in strikes landed between opponents having decreased, and the length of fights having increased over the years. The start of the trend appears in line with the boom of popularity of 2005.

<a href="#" onclick="window.open('/graphs/victory_methods_over_time.html', 'newwindow'); return false;"><img src="/imgs/victory_methods_over_time.png"></a>

This goes along with the trend towards fights being settled through Decisions having increased since 2005 (a.k.a the max duration of a match having been reached). Similarly, for KOs becoming a bit less popular past 2005.

Now that we've done an overview, let's dig into the details of what has changed in regards to fighting strategies.

## The Standing Game
Broadly, MMA matches have two different sides to them: fighting while standing, or fighting a felled opponent (respectively, the standing game and the ground game). 

We start with the standing game. 

### Strikes vs Takedowns
Attacks in the standing game can be categorized as strikes or takedowns (a.k.a grabbing the opponent to make them fall). How have their average yearly frequencies evolved over time?

<a href="#" onclick="window.open('/graphs/strikes_per_min_over_time.html', 'newwindow'); return false;"><img src="/imgs/strikes_per_min_over_time.png"></a>

Strike attempts have become more and more frequent, from a yearly average of around 6 per minute in 2000, to 11 in 2022.

On the other hand, their accuracy have decreased greatly from its peak of 75% in 2001, stabilizing to around 52% for 2010-2020. However, it has started seeing a spike increase above 55% since then.

This paints the picture of a volume-centric strike strategy, with a cost in accuracy; a cost which is seeing signs of decreasing. 

What about takedowns?

<a href="#" onclick="window.open('/graphs/tkd_per_min_over_time.html', 'newwindow'); return false;"><img src="/imgs/tkd_per_min_over_time.png"></a>

Takedown attempts and accuracy have stabilized at a lower point over time. We note that both attempts and accuracy had a major uptick in the last year, 2022. Both trends' noisy starts comes from low takedown samples at a time where there were fewer UFC matches. 

The trends of takedown attempts can be seperated into three groups: noisy oscilation between 0.25-0.39 attempts per minute between 2000-2010, which settled into a stable 0.29-0.30 between 2010-2014. Then a valley of 0.24-0.28 between 2015-2022.

Simiarly, accuracy saw a noisy start of range 27%-56% between 2000-2005, into a generally decreasing trend of range 55%-34% between 2005-2011, so as to reach a somewhat stable range of 34%-40% between 2011-2022.

Overall, to compare strikes and takedowns: strike attempts are more than an order of magnitude more frequent than takedown attempts, and that difference has only grown over time. So, generally speaking, striking dominates the standing game. However, takedowns are pivotal attacks if landed, transitioning the fight to the ground. Given their accuracy is not that much lower than those of strikes, their infrequency must not be mistaken for ineffectiveness.

### Nuances of Striking
There is much more to strikes than volume and accuracy, and given their dominance over the standing game, it is important to delve into their details to understand the standing game meta.

To dive deeper into their development over time, let's look at changes in their various characteristics.

#### Distance
In strike-oriented martial arts, there is a distinction made between infighters and outfighters: the respective tendency to fight up-close or by maintaining distance. Let's look at how strike distance has evolved in MMA. 

<a href="#" onclick="window.open('/graphs/proportions_strike_distance_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_distance_over_time.png"></a>

Over the decades, there has been a fairly steady trend towards striking from a distance over strikes at clinch distance. In other words, the striking meta has progressed towards outfighting. This ties with the inhibited ability to attempt takedowns; generally requiring to be at close range.

<a href="#" onclick="window.open('/graphs/strike_acc_by_distance_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_distance_over_time.png"></a>

Strike accuracy at both distances have been on a slight upward trajectory for the last decade. Clinch strikes have always been much more accurate than distance strikes, which makes sense intuitively; farther attacks would be easier to avoid.

#### Target
What about where strikes are aimed? Which body parts between head, body and legs?

<a href="#" onclick="window.open('/graphs/proportions_strike_target_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_target_over_time.png"></a>

Unsurprisingly, aiming for the head has always been overwhelmingly the favored target, sitting fairly steadily around 80%. Leg kicks have plateaud, despite a period of popularity between 2000 and 2005. Meanwhile, body blows ever so slowly increased in frequency over time.

<a href="#" onclick="window.open('/graphs/strike_acc_by_target_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_target_over_time.png"></a>

For all targets, accuracies has trended downward passed 2001, until around 2010 where they've started slowly improving over time (2015 for body strikes). After 2020, all target accuracies saw a sudden noticable increase.

There is an inverse correlation between strike target frequency and its accuracy; targets that are more frequently aimed at are the least accurate. An intuition for this is that the more situational the attack, the more certain landing it is when the opportunity to aim for it does appear. For example, a low kick being difficult to avoid but is more situational when compared to a jab to the head, which is popular for its low commitment and low risk, despite its low accuracy.


#### Significance

There is one more way to categorize strikes; by their significance. In other words, strikes that could seriously damage if landed, versus those that were thrown without that danger.

<a href="#" onclick="window.open('/graphs/proportions_strike_sig_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_sig_over_time.png"></a>

Over time, the meta is developing around attempts at decisive blows; from 49% in the 2000, to 63% in 2022. This growth has plateaud.

One might have thought that the focus on outfighting would lead to a higher proportion of minimal strikes; but it ended up the other way around. This indicates that the outfighting meta is an aggressive kind, which ties to the earlier insight about overall strike frequency having increased.

<a href="#" onclick="window.open('/graphs/strike_acc_by_sig_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_sig_over_time.png"></a>

Since 2009, significant strikes have become more accurate over time (from 39% to 48%), Meanwhile, minimal strikes have grown a little less accurate over time, from 93% to 88% since 2000.

Despite that, minimal strikes remain overwhelmingly more accurate than significant blows. This is because minimal strikes have lower bodily commitment; prioritizing increasing speed and lowering tells, over power. Such as is the case with jabs compared to crosses; the faster lead hand versus the stronger read hand.


## The Ground Game
We've covered the standing game, let's move on to the ground game; where you try to finish off a downed opponent.

### Strikes vs Submissions
There are two main methods to checkmate the opponent while on the ground: the "ground and pound" (mounting the opponent to throw a one-sided barrage of strikes), and submissions (grappling the opponent to make them yield).

<a href="#" onclick="window.open('/graphs/ground_strikes_freq_over_time.html', 'newwindow'); return false;"><img src="/imgs/ground_strikes_freq_over_time.png"></a>

Attempts at strikes have overall become less frequent on the ground. The peak consecutive years was around 4 attempts per minute on the ground, between 2005-2008, but has decreased so that by 2022, the freqency reached its lowest point of around 2.8. Though, we note that there was an uptick between 2016-2018 reaching around 3.8.

The accuracy of ground strikes have increased over time. For 2000-2010, it sat in a noisy range of 58-67%, and has increased until reaching a consistent range of 71-73% since 2016.

<a href="#" onclick="window.open('/graphs/sub_freq_over_time.html', 'newwindow'); return false;"><img src="/imgs/sub_freq_over_time.png"></a>

Submission attempts have grown less frequent. From 2005 till 2015, it has been on a steep decline; from 0.30 attempts per minute on the ground, to 0.14. It has been oscillating around that value since then.

And even more so than strikes, their accuracy have increased significantly over the years. From 24% in 2002, to 61% in 2022; they have grown incredibly dangerous.

Overall, all forms of attacks on the ground have grown less frequent; it's a slower game. Though strikes remain dominant, an order of magnitude more frequent than submissions. Meanwhile, when any attack is used, it has grown more likely to land; i.e. they are being thrown more deliberately.

This attack infrequency could be due to improvements in defense by the opponent who fell. For example, improvements in closed guard, a.k.a the typical guard position taken to defend yourself while on the ground, one which must be passed by the opponent before attacking.

<a href="#" onclick="window.open('/graphs/ground_control_dur_per_down_over_time.html', 'newwindow'); return false;"><img src="/imgs/ground_control_dur_per_down_over_time.png"></a>

As for the ability to escape from the ground, it has improved greatly from 2000 till 2005, given the lowered time of ground control. Passed that, that duration has only slowly decreased.

# Part 2: Predicting Winners

Let's train a model that takes the historical stats from 2 fighters, and predicts who would win.

## Dataset Preparation

From the dataset of all UFC matches, for each match, we generate a historical profile for the two contestants based on aggregates from all their respective prior matches. We also compute some values like age differentials and win streaks. Given the size of the dataset, we perform a 90-5-5 training-validation-testing split. We one-hot encode categorical data, normalize and fill values before splits, etc...

But careful! There are 2 big traps to avoid which would ruin the training:

First, we can't just build a single historical profile for each fighter. To illustrate, imagine if the model was training on the first ever UFC match of a future world champion, back when he was a novice. Obviously, giving the model his future profile as a world champion would ruin the data and the model would pick him as a winner for this novice match. So, each fight requires a historical profile to be generated from the fighter at that moment in time.

Secondly, avoiding time-based data contamination when splitting the dataset into training-validation-testing sets. We sort matches by date, with the first 90% of matches going to the training set. 

<a href="#" onclick="window.open('/graphs/training_set_cutoff.html', 'newwindow'); return false;"><img src="/imgs/training_set_cutoff.png"></a>

The rest is split equally between validation and testing sets and are thus all matches that are farther ahead in time than what was trained on. Now, the evaluation will be trustworthy... though, at the cost of the model not learning anything from the 10% most recent matches; matches passed 2020.

## Training

What architecture should we select for this binary classification task? Some initial training between common algorithms found that XGBoost was performing best on basically all evaluation metrics. XGBoost is an ensemble decision-tree, generally highly performant, and has an in-built ability to find the data's most important features. 

Now that we've selected a model, we perform hyperparameter tuning, a.k.a trying a bunch of setting configurations to train the best XGBoost model. We do this through grid search, basically trying all combination of settings. It's not a problem given this model trains pretty fast. Ultimately, the best model we find gives evaluations of:

<a href="#training"><img src="/imgs/eval_grid_search.png"></a>

Keep in mind, accuracy is rarely a useful evaluation metric. For this example, we favored precision; imagining the use-case of a safe betting model that only bets when it is confident in success.

## Feature Selection

We've trained the model on the dataset's hundreds of features. This is often detrimental; lowering scores and increasing compute for many features which might be useless. Let's find the most important features to keep.

<a href="#" onclick="window.open('/graphs/top_features_ANOVA_f.html', 'newwindow'); return false;"><img src="/imgs/top_features_ANOVA_f.png"></a>

An ANOVA F-Score test is a common way to select features of highest correlation. Here, we find that the most important features for winner prediction tend to be strike based. Strike differential metrics and ground strike metrics are especially useful.

But, like we mentionned previously, XGBoost has an innate functionality to compute feature importances. We'll use this instead of ANOVA to select the most useful features.

Our methodology is to take the features importance of our current model, and trim away the lowest ranked feature, one at a time. We then train a new model on each of those feature subsets, and keep the one with the highest precision evaluation score.

<a href="#" onclick="window.open('/graphs/feature_importance_and_threshold.html', 'newwindow'); return false;"><img src="/imgs/feature_importance_and_threshold.png"></a>

The best model is found at a cutoff of 55 features. The rest of the features will be discarded. We can check the updated feature importance graph of this model:

<a href="#" onclick="window.open('/graphs/feature_importance_precision_model.html', 'newwindow'); return false;"><img src="/imgs/feature_importance_precision_model.png"></a>

Finally, here is an evaluation table where we compare to the model with only hyperparameter tuning:

<a href="#feature-selection"><img src="/imgs/eval_feature_select.png"></a>

Overall, we beat the previous model in every way through feature selection.

## Simplified Betting

As a final test, let's simulate a betting game competition between models at different stages of development, and see how much money it can make when applied to the testing set. 

This is a toy evaluation, as it's missing a major component of real betting; betting odds for each fights. Here, we assume 1:1 odds, and the models bet amounts based on their confidence levels.

<a href="#" onclick="window.open('/graphs/cumul_earnings_eval_bets.html', 'newwindow'); return false;"><img src="/imgs/cumul_earnings_eval_bets.png"></a>

Our precision oriented model with feature selection led to an increase in earnings of around 8%, compared to only tuning hyperparameters.

# Conclusion

We explored how the MMA meta has evolved over time. To oversimply, it has become slower paced. The standing game focusing on strike heavy outfighting, and a more defensive ground game.

We can use all the fight data accumulated to predict future fights. This could be useful for fans who enjoy guessing who might win or even for real betting. It also allows us to explore the most important factor towards victory, through machine learning.

There is a lot that we can't do, in part due to the limitations of the data. For one, computer vision could be used to generate time-series data on matches, rather than just aggregates. This would allow to study the meta is more detail, and for machine learning to be trained to predict winners live, with the probability changing based on what is happening in the match. From an audience perspective alone, this would be really engaging.