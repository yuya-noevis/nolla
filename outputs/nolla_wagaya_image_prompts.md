---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-07
PURPOSE: わが家キャラ画像生成プロンプト
RELATED: nolla_character_design_prompts.md
---

# 今日もわが家は通常運転 — 画像生成プロンプト集

Nano Banana 2（Gemini）にそのままコピペ。
画像サイズ指定: 1080x1350px（4:5縦長）
※4:5がInstagramフィードの最大縦長。上下に十分な余白を取ること（重要な要素は上端・下端から100px以上内側に配置）

### テキスト・吹き出し混入防止（重要）

- **「manga」は使うな**: 「manga style」「manga panel」「comedy manga」等の単語を使うと、AIが漫画の慣習（擬音テキスト・ナレーション枠・効果音・白枠コメント）を自動で描く。代わりに「kawaii illustration」「cute deformed chibi style」を使う
- **「radiating lines」「shock lines」等の漫画表現も禁止**: これらもテキスト描画のトリガーになる
- **大文字の英単語を使うな**: BOTH, FINALLY, ZERO等の大文字はAIがそのままテキストとして描画する
- **テキストなしの枚**: プロンプト冒頭に「4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere.」と書く
- **セリフありの枚**: 母親のセリフが必要なシーンのみ「She has a round speech bubble containing only: "（日本語セリフ）"」と書き、末尾に「The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.」と書く
- **タイトルカード**: タイトルの日本語テキストのみ許可。末尾に「No narration box, no white bar, no frame title. The image contains only the Japanese title above and nothing else」と書く

### 足元ルール

- **屋外シーン（公園・スーパー・道路など）**: 母・息子ともに**靴を履いている**こと。プロンプトに靴の指定を入れる
- **室内シーン（家の中）**: 靴下のまま or 裸足でOK。靴は不要

---

## キャラクターデザイン（最初に1回だけ生成）

```
Character design sheet for a 4-panel comedy manga. White background. Simple loose line art, thick outlines, flat pastel colors. Japanese comedy manga style like Mamekichi Mameko.

Show two characters side by side with 4 expressions each (happy, surprised, tired, laughing):

Character 1 - MOTHER: Young woman, messy short hair, round glasses, oversized beige hoodie. Round face, dot eyes, simple line mouth. 3-head-tall deformed proportions. Always slightly tired but warm expression.

Character 2 - SON (age 5-6): Small boy, spiky messy hair pointing all directions, oversized striped t-shirt. Big round head, tiny body. Intense focused eyes, big innocent smile. NEVER speaks - communicates only through facial expressions, body language, and his alien toy. Always holding a small green alien plush toy (one big eye, tiny antenna, stubby arms, round body). He never has speech bubbles.

Also show the green alien plush toy as a separate larger reference. The alien is round, green, has one big cute eye, a small antenna on top, and stubby little arms.

Style: kawaii, hand-drawn feel, comedy manga, warm colors, deformed cute proportions.
```

---

## 投稿①「いつもの道じゃないとダメ」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (light orange/cream gradient). Japanese comedy manga style.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt) standing frozen with wide shocked eyes, gripping a small green one-eyed alien plush toy tightly, placed in the center-bottom area. Above the character, compact Japanese text: "いつもの道じゃないとダメ" in round gothic font. The text should be small enough to fit in one or two lines, occupying no more than 40% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design.
```

### 枚2（ほのぼの導入）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

A mother (messy short hair, round glasses, beige hoodie) and her small son (spiky hair, oversized striped t-shirt, holding a small green one-eyed alien plush toy) walking on a residential street in the evening. Warm sunset colors.

The son is skipping happily, holding the alien toy up in the air. The mother is walking beside him, smiling gently.

Peaceful, warm atmosphere. Simple background with a few houses and trees. Kawaii deformed style, hand-drawn feel.
```

### 枚3（急展開）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

Same mother and son characters on the street. The mother is pointing to a different road, smiling and suggesting a new route.

The son has FROZEN completely still. His eyes are wide open circles of shock. He is gripping his green alien plush toy tightly to his chest. His feet seem glued to the ground. Small shock effect lines around him.

Comedy manga expressions. Exaggerated surprise reaction from the boy. The mother looks slightly nervous/sweating. Kawaii deformed style.
```

### 枚4（オチ：クスッ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

Same mother and son walking on their original familiar route. The son is happily skipping again, swinging his green alien plush toy cheerfully. Completely back to normal, big smile.

The mother is walking behind him with a small knowing smile, one hand on her cheek. A small speech bubble or text area with "…知ってた" (I knew it). She looks amused and accepting.

Warm, funny, gentle atmosphere. The alien toy also seems happy (tilted at a cheerful angle). Kawaii deformed style.
```

### 枚5（Tips — テキスト画像）

この枚はCanvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー
フォント: 丸ゴシック系

テキスト内容:

```
【「いつもと同じ」が安心のもと】

いつもの道・いつもの順番・いつもの場所——
変わると固まっちゃうこと、ありませんか？

🧠 なぜそうなる？
・「こうなるはず」の予測で安心を作るタイプの子は
　予測と違う展開にびっくりしやすい
・ワガママではなく「安心の作り方」が独特なだけ

✅ こうするといい感じ
・事前に「今日はこっちの道から帰るよ」と予告する
・地図やルートを絵で見せておく
・「いつもの道＋ちょっと寄り道」で少しずつ広げる

🚫 これは逆効果かも
・突然ルートを変えて「大丈夫だよ！」と押し通す
・「なんでそんなことで怒るの？」と理由を問い詰める

※お子さんによって合う方法は違います
```

---

## 投稿②「タグがチクチクする」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (light pink/cream gradient). Japanese comedy manga style.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt) scratching the back of his neck with a distressed face, placed in the center-bottom area. His small green one-eyed alien plush toy is on the ground beside him. Above the character, compact Japanese text: "タグがチクチクする" in round gothic font. The text should be small enough to fit in one line, occupying no more than 40% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design.
```

### 枚2（日常の始まり）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

A mother (messy short hair, round glasses, beige hoodie) holding up a cute new t-shirt with a dinosaur print, looking excited and proud.

Her small son (spiky hair, oversized striped t-shirt, holding green alien plush toy) is looking at the new shirt.

The mother has sparkles around her, excited expression. Bright, cheerful scene in a bedroom. Kawaii deformed style.
```

### 枚3（異変）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The small son is now wearing the new dinosaur t-shirt. He shows extreme discomfort - scratching the back of his neck frantically with both hands, pulling at the shirt trying to take it off. NO speech bubble, NO text from the boy - he does not speak. His green alien plush toy has been dropped on the floor (dramatic).

The boy's expression is distressed, eyes squeezed shut. Comedy sweat drops and discomfort lines around him. He communicates only through body language and facial expressions, never words.

The dropped alien toy on the floor emphasizes how serious this is (he NEVER drops it). Kawaii deformed style, exaggerated comedy expressions.
```

### 枚4（母の戦い）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The mother is sitting at a table with the dinosaur t-shirt laid flat in front of her. She is carefully cutting the tag off with a small pair of scissors, concentrating hard. Sweat drops on her forehead. Her expression is intense and focused.

In the background, the small son and his green alien plush toy are watching from a distance, peeking from behind a door. Both looking nervous/hopeful.

Comedy scene. Careful operation in progress. Kawaii deformed style.
```

### 枚5（オチ：クスッ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The son is happily wearing the dinosaur t-shirt, completely fine now, big smile. He is hugging his green alien plush toy tightly, beaming with joy. No speech bubble - he never speaks.

The mother is sitting on the floor behind him, completely exhausted, slumped over. A small text area with "…朝からお疲れさまでした（自分に）" (good work this morning...to myself).

Warm funny contrast: happy energetic son vs. exhausted mom. The alien toy seems to approve of the shirt. Kawaii deformed style.
```

### 枚6（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【タグがチクチク問題】

新しい服・特定の素材・縫い目の感触——
「着られない服」があること、ありませんか？

🧠 なぜそうなる？
・皮膚からの感覚を強く受け取るタイプの子は
　多くの人が気にならない刺激も「痛い」と感じる
・感じ方の違いであって、大げさなわけではない

✅ こうするといい感じ
・タグは事前にカット（縫い付け部分ギリギリで）
・裏返しに着てもOKにする
・本人と一緒に「触って確認」してから買う

🚫 これは逆効果かも
・「気にしすぎ」「慣れれば平気」と押し通す
・着ないことを叱る

※お子さんによって合う方法は違います
```

---

## 投稿③「スーパーで突然フリーズ」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (light blue/cream gradient). Japanese comedy manga style.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt) standing completely frozen with eyes squeezed shut, pressing a small green one-eyed alien plush toy against his ears, placed in the center-bottom area. Above the character, compact Japanese text: "スーパーで突然フリーズ" in round gothic font. The text should be small enough to fit in one line, occupying no more than 40% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design.
```

### 枚2（平和な買い物）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

A mother (messy short hair, round glasses, beige hoodie) pushing a shopping cart in a supermarket, looking at a shopping list memo.

Her small son (spiky hair, oversized striped t-shirt) is walking beside the cart, holding his green alien plush toy and looking at the vegetables curiously.

Normal peaceful shopping scene. Bright supermarket interior, simple shelves in background. Kawaii deformed style.
```

### 枚3（フリーズ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

In the supermarket. A store announcement speaker is shown with sound effect lines radiating from it.

The small son has completely frozen. His eyes are squeezed shut. He is pressing his green alien plush toy against both ears, using it as earmuffs. His whole body is tense and stiff.

The mother has noticed and turned around with a concerned but calm expression. She is already moving toward him. Kawaii deformed style, gentle but emotional scene.
```

### 枚4（オチ：ほっこり）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The mother is crouching down to the son's eye level. She is gently holding his hand. No speech bubbles - just the quiet moment.

The son is slowly opening his eyes, still holding the green alien plush toy but relaxing his grip. He squeezes his mother's hand back.

Warm soft lighting. A gentle, quiet, emotional moment. In the corner, a small thought bubble from the mother: "うん、今日はもう帰ろっか" (let's just go home for today).

View from slightly behind them - mother and son holding hands, walking toward the checkout, seen from the back. Small and warm in the big supermarket. The alien toy dangles gently from the son's other hand. Kawaii deformed style, heartwarming ending.
```

### 枚5（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【音にびっくりしやすい子】

急な放送・ドライヤー・掃除機——
突然の音でフリーズしたり耳をふさぐこと、ありませんか？

🧠 なぜそうなる？
・音の情報を強く受け取るタイプの子は
　周囲が気にならない音でもびっくりするほど大きく聞こえる
・聞こえ方が違うだけで、怖がりなわけではない

✅ こうするといい感じ
・「お店で放送が鳴るかもね」と事前に伝える
・イヤーマフや耳栓を持ち歩く
・音が苦手な場所では短時間で済ませる

🚫 これは逆効果かも
・「うるさくないよ！」と感覚を否定する
・「いつまで泣いてるの」と急かす

※お子さんによって合う方法は違います
```

---

## 投稿④「掃除機が怖い」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (light green/cream gradient). Japanese comedy manga style.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt) running at full speed toward the viewer with a terrified expression, clutching his small green one-eyed alien plush toy under his arm like a football, placed in the center-bottom area. Behind him, a menacing upright vacuum cleaner is shown with dramatic aura lines. Above the character, compact Japanese text: "掃除機が怖い" in round gothic font. The text should be small enough to fit in one line, occupying no more than 40% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design.
```

### 枚2（平和な日常）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

A living room scene. A mother (messy short hair, round glasses, beige hoodie) is pulling out a vacuum cleaner from a closet, looking casual and relaxed.

Her small son (spiky hair, oversized striped t-shirt, holding green alien plush toy) is sitting on the floor nearby, peacefully stacking blocks. The green alien plush toy is propped up watching the blocks.

Calm, normal domestic scene. Nothing dramatic yet. Kawaii deformed style.
```

### 枚3（全力逃走）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The mother has turned on the vacuum cleaner — shown with dramatic sound effect lines and a menacing aura around it.

The small son is in mid-sprint, running away at full speed with a terrified face, eyes wide as saucers. He has grabbed his green alien plush toy and is holding it tightly against his chest while running. His blocks are scattered everywhere behind him. Speed lines emphasize his escape. NO speech bubble — he never speaks.

The mother is standing there holding the vacuum, looking surprised with a sweat drop. Comedy manga style exaggeration. Kawaii deformed style.
```

### 枚4（オチ：クスッ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The son is peeking out from behind the sofa, only his eyes and the top of his spiky hair visible. He is holding out his green alien plush toy in front of him like a scout, the alien toy pointing toward the vacuum cleaner area as if checking if it's safe. The boy's expression is cautious and serious.

The mother is in the background, vacuum cleaner now OFF and put away. She is waving at him with a gentle smile. A small text area with "偵察、ご苦労さま" (thanks for the recon mission).

Funny, warm scene. The alien toy as a "scout" is the comedy point. Kawaii deformed style.
```

### 枚5（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【音の大きい家電がこわい子】

掃除機・ドライヤー・ブレンダー——
スイッチONで逃げ出すこと、ありませんか？

🧠 なぜそうなる？
・家電の低周波音や突然の起動音は
　聴覚が敏感な子にとって予測できない「脅威」
・怖がっているのではなく、音が本当に「痛い」

✅ こうするといい感じ
・「今から掃除機つけるよ」と必ず予告する
・別の部屋に避難してもらってからスイッチON
・イヤーマフや好きな音楽で音をカバーする

🚫 これは逆効果かも
・「大丈夫だよ！」と無理に慣れさせようとする
・逃げることを叱る

※お子さんによって合う方法は違います
```

---

## 投稿⑤「ミニカーは走らせない。並べるもの。」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (light yellow/cream gradient). Japanese comedy manga style.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt) sitting on the floor, intensely focused with serious eyes, carefully placing a miniature toy car in a perfectly straight line of many toy cars. His small green one-eyed alien plush toy sits at the end of the line like a judge inspecting the alignment. Above the character, compact Japanese text: "ミニカーは走らせない。並べるもの。" in round gothic font. The text should be small enough to fit in one or two lines, occupying no more than 50% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design.
```

### 枚2（職人の仕事）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

A living room floor scene. The small son (spiky hair, oversized striped t-shirt) is sitting cross-legged on the floor with extreme concentration. He is carefully lining up about 10 colorful miniature toy cars in a perfectly straight row. His expression is intense and focused, like a craftsman at work. His green alien plush toy is placed at the end of the line, as if overseeing the arrangement.

The precision of the car lineup is exaggerated — every car is perfectly aligned, evenly spaced. Bird's eye view angle to show the perfect line. Kawaii deformed style.
```

### 枚3（触っちゃダメ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The mother (messy short hair, round glasses, beige hoodie) has picked up one toy car from the line and is making a "vroom vroom" gesture, trying to play with it by rolling it. She has a playful smile.

The son's face is FROZEN in absolute horror. His eyes are huge circles of shock. His mouth is a tiny dot. He is reaching out toward the car with both hands in a "STOP" gesture. The green alien plush toy has fallen over dramatically. NO speech bubble — he never speaks. His expression alone conveys pure devastation.

Comedy manga exaggeration. Shock lines radiating from the boy. Kawaii deformed style.
```

### 枚4（オチ：クスッ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The son has restarted the entire lineup from scratch. He is placing cars one by one with the same intense concentration as before. ALL cars are back in a perfect line. He looks satisfied and focused. The green alien plush toy is back in its position at the end of the line.

The mother is sitting in the background, hands in her lap, watching with a small resigned smile. A small text area with "…展覧会だったらしい" (apparently this was an exhibition). She looks amused and has given up trying to play with the cars.

Warm, funny scene. The contrast between the boy's serious art installation and the mom's acceptance is the comedy. Kawaii deformed style.
```

### 枚5（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【並べる遊びが好きな子】

ミニカー・クレヨン・ぬいぐるみ——
きれいに並べて、触ると怒ること、ありませんか？

🧠 なぜそうなる？
・規則的に並べることで「自分の世界」を整えている
・崩されると「予測どおりの安心」が壊れてパニックに
・遊び方が違うだけで、遊んでいないわけではない

✅ こうするといい感じ
・完成したら「すごいね」と認める（崩さない）
・横に自分のミニカーを並べて「参加」してみる
・片付けるときは事前に「そろそろしまおうね」と予告

🚫 これは逆効果かも
・「走らせて遊びなさい」と遊び方を矯正する
・完成した並びを勝手に崩す

※お子さんによって合う方法は違います
```

---

## 投稿⑥「手が汚れたら世界の終わり」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (light purple/cream gradient). Japanese comedy manga style.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt) holding both hands up in front of him with a horrified expression, fingertips slightly dirty with sand. His small green one-eyed alien plush toy is tucked under his arm, away from the dirty hands. Above the character, compact Japanese text: "手が汚れたら世界の終わり" in round gothic font. The text should be small enough to fit in one line, occupying no more than 50% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design.
```

### 枚2（砂場チャレンジ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

A park sandbox scene. The mother (messy short hair, round glasses, beige hoodie) is gently encouraging her son at the edge of the sandbox. She is making a sandcastle, looking inviting and cheerful.

The small son (spiky hair, oversized striped t-shirt) is standing at the very edge of the sandbox, looking down at the sand cautiously. He is holding his green alien plush toy close to his chest protectively, keeping it far from the sand. His expression is uncertain but curious.

Bright outdoor scene with playground equipment in the background. Kawaii deformed style.
```

### 枚3（フリーズ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

Close-up scene. The son has touched the sand with just one fingertip. His entire body has FROZEN. His eyes are wide and blank. His dirty finger is held out in front of him like it's been contaminated. His other hand clutches the green alien plush toy behind his back, keeping it safe from the sand.

His expression is one of complete shock — as if the world has ended. NO speech bubble — he never speaks. Dramatic shock lines radiating from his hand. The single grain of sand on his fingertip is drawn comically large.

The mother is watching from the side, already reaching for something in her bag. Kawaii deformed style, comedy exaggeration.
```

### 枚4（オチ：クスッ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The mother is pulling out wet wipes from her bag — but not just one pack. She has THREE packs of wet wipes lined up, like ammunition. She has a confident, battle-ready expression with a small smirk.

The son is holding both hands out toward her expectantly, still looking at his sandy fingertip with distress. The green alien plush toy is perched on the boy's head, also looking at the dirty finger with concern.

A small text area near the mother: "ウェットティッシュ3パック装備、なめんなよ" (3 packs of wet wipes equipped — don't underestimate me).

Funny, empowering mom moment. Comedy manga style. Kawaii deformed style.
```

### 枚5（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【手が汚れるのが苦手な子】

砂・粘土・のり・食べ物——
手につくと固まったり泣くこと、ありませんか？

🧠 なぜそうなる？
・手のひらの触覚が敏感なタイプの子は
　ベタベタ・ザラザラの感触が「気持ち悪い」を超えて苦痛
・触れないのは「わがまま」ではなく感覚の特性

✅ こうするといい感じ
・ウェットティッシュを常備して「すぐ拭ける」安心を
・スプーンやヘラなど道具を使って間接的に触れる
・水遊びなど「洗い流せる」素材から始める

🚫 これは逆効果かも
・「汚れても平気でしょ」と手を砂に押しつける
・触れないことを「神経質」と決めつける

※お子さんによって合う方法は違います
```

---

## 投稿⑦「公園から帰れない」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (warm orange/sunset gradient). Japanese comedy manga style.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt) sitting on a swing, gripping the chains tightly with a determined stubborn expression, refusing to let go. His small green one-eyed alien plush toy is wedged between him and the swing seat. The sky behind shows late sunset colors. Above the character, compact Japanese text: "公園から帰れない" in round gothic font. The text should be small enough to fit in one line, occupying no more than 40% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design.
```

### 枚2（ご機嫌ブランコ）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

A park scene in the afternoon, bright and cheerful. The small son (spiky hair, oversized striped t-shirt) is on a swing, pumping his legs happily with a huge joyful smile. His green alien plush toy is on his lap, bouncing with each swing. Motion lines show the swing going high.

The mother (messy short hair, round glasses, beige hoodie) is sitting on a bench nearby, looking at her phone casually, relaxed.

Other playground equipment visible in the background. Warm, happy atmosphere. Kawaii deformed style.
```

### 枚3（帰るよコール無視）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The mother is standing next to the swing, hand raised, calling out to the son. A speech bubble says "帰るよー" (time to go home). She has a gentle but slightly tired smile.

The son is COMPLETELY ignoring her. He continues swinging with the exact same happy expression, eyes not even glancing at her. His green alien plush toy seems to be looking away from the mother too. The boy shows zero acknowledgment — not defiant, just genuinely absorbed. NO speech bubble from the boy — he never speaks.

Comedy contrast: the mother's effort vs. total non-response. Kawaii deformed style.
```

### 枚4（30分後…）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

The sky has changed to deep sunset orange and purple. A small text at the top says "30分後" (30 minutes later).

The son is STILL on the swing, still happily swinging with the same expression. His green alien plush toy is still on his lap. Nothing has changed about him at all.

The mother is now sitting on the ground next to the swing, legs stretched out, completely deflated and exhausted. Her bag is on the ground. The park is empty — everyone else has gone home. A few autumn leaves blow by.

Funny, warm scene. The son's unchanging joy vs. the mother's slow defeat. Kawaii deformed style.
```

### 枚5（オチ：ほっこり）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

Twilight scene with early stars visible. The mother and son are walking home together, seen from behind in silhouette-like style against the dusky sky. The son is walking slowly, holding his green alien plush toy in one hand. His other hand is reaching up to hold his mother's hand.

The mother has a small text thought: "…まあ、いい夕焼けだったし" (well, it was a nice sunset at least). She looks peaceful despite being tired.

Warm, gentle, emotional ending. Beautiful sky colors. The park visible far behind them. Kawaii deformed style, heartwarming atmosphere.
```

### 枚6（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【好きなことをやめるのが難しい子】

ブランコ・動画・お絵描き——
「おしまい」がなかなかできないこと、ありませんか？

🧠 なぜそうなる？
・好きなことへの集中力が強く「切り替え」にエネルギーがいる
・「やめなさい」が聞こえていない場合もある（無視じゃない）
・「終わり」の見通しが立たないと不安で手放せない

✅ こうするといい感じ
・「あと3回こいだら帰ろうね」と終わりを具体的に伝える
・タイマーを見せて「ピッて鳴ったらおしまい」を習慣に
・次の楽しみを予告する（「帰ったらおやつだよ」）

🚫 これは逆効果かも
・いきなり体を引き離す
・「いい加減にしなさい！」と怒鳴る

※お子さんによって合う方法は違います
```

---

## 投稿⑧「雨だから公園は中止です」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (light gray-blue/cream gradient with rain drops). Japanese comedy manga style.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt) standing in the doorway wearing his outdoor shoes indoors, clutching his small green one-eyed alien plush toy, with a tense rigid body posture — arms pressed to his sides, jaw clenched, feet planted firmly. Rain is visible through the window behind him. Above the character, compact Japanese text: "雨だから公園は中止です" in round gothic font. The text should be small enough to fit in one line, occupying no more than 50% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design.
```

### 枚2（今日は公園！）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style.

Morning scene, sunny weather visible through a window. The mother (messy short hair, round glasses, beige hoodie) is smiling cheerfully, holding up a small backpack, speaking to her son. A speech bubble says "今日は公園行くよ！" (we're going to the park today!).

The son (spiky hair, oversized striped t-shirt) is already putting on his shoes at the front door with intense excitement, moving at high speed. His green alien plush toy is already "wearing" a tiny hat (imagined adventure gear). The boy's eyes are sparkling with anticipation.

Bright, energetic, happy scene. Kawaii deformed style.
```

### 枚3（雨…）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors. Japanese comedy manga style.

DARK, GLOOMY scene. The entire background is dark gray-blue. A large window takes up the upper half of the image, showing HEAVY RAIN pouring down the glass with visible rain streaks and water droplets. Dark storm clouds visible outside. The room is dim.

In the foreground, the mother (messy short hair, round glasses, beige hoodie) is crouching down with a TROUBLED, GUILTY expression — eyebrows raised in worry, mouth turned down, small sweat drop on her forehead. Her hands are pressed together in an apologetic gesture. A speech bubble says "ごめん、雨だから中止…".

The son (spiky hair, oversized striped t-shirt, WEARING SHOES — he hasn't taken them off) is standing rigid like a statue, arms stiff at his sides, gripping his green alien plush toy so tightly it's slightly squished. His face is COMPLETELY BLANK — wide open eyes staring at nothing, mouth a flat line. His body is frozen stiff. NO speech bubble — he never speaks.

Key mood: dark, gloomy, tense. This is the opposite of the bright sunny previous panel. The rain dominates the image. Kawaii deformed style but with dramatic mood shift.
```

### 枚4（靴、脱がない）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors. Japanese comedy manga style.

INDOOR scene at the front entrance (genkan) of a Japanese house. The background is dim — a small window or glass door shows RAIN still pouring outside, reinforcing that the weather is bad.

Close-up composition focused on the entrance floor. The son (spiky hair, oversized striped t-shirt) is sitting on the genkan step with his OUTDOOR SHOES still on his feet, hugging his knees tightly to his chest, curled into a ball. His green alien plush toy is squeezed against his chest. His eyes are open but staring at the floor — completely shut down, not crying, not angry, just REFUSING to accept the situation. His whole body is curled inward and tense.

Next to him on the floor, the mother (messy short hair, round glasses, beige hoodie, in socks) has placed a pair of indoor slippers — untouched, ignored. The mother is sitting on the floor nearby, chin resting on her hand, watching him with a patient but tired expression. She is NOT smiling — her face shows quiet resignation, "I'll wait."

The emphasis is on the boy's shoes: he won't take them off because in his mind, they are STILL going to the park. The slippers sitting there untouched tell the whole story. Muted, quiet colors. Kawaii deformed style but emotionally heavy scene.
```

### 枚5（おうち公園）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, bright warm background. Japanese comedy manga style.

The living room has been transformed into an indoor playground. Cushions and pillows are stacked like a mountain. A blanket is draped between chairs to make a tunnel. A laundry basket is turned upside down as a "bench."

The son is climbing the cushion mountain with his green alien plush toy held high above his head like a flag on a summit. His expression has shifted — a small but real smile is forming. His shoes are finally OFF (visible neatly placed at the edge of the scene).

The mother is on all fours, pretending to be a tunnel bridge, slightly crushed but smiling. A small text area: "おうち公園、開園しました" (indoor park is now open).

Warm, creative, funny resolution. The effort the mother put in is visible. Kawaii deformed style.
```

### 枚6（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【予定が変わるとパニックになる子】

雨で公園が中止・お店が休み・順番が変わる——
予定どおりにいかないと固まること、ありませんか？

🧠 なぜそうなる？
・「こうなるはず」の見通しで安心を作っている
・予測と違う展開は「想定外のエラー」のように感じる
・わがままではなく、切り替えに時間とエネルギーがいる

✅ こうするといい感じ
・「雨かもしれないから、その時はおうち遊びにしよう」と事前にプランBを伝える
・予定変更は視覚的に伝える（カレンダーに×→新しい予定を書く）
・気持ちを受け止めてから代替案を出す（「公園行きたかったよね」→「おうち公園はどう？」）

🚫 これは逆効果かも
・「仕方ないでしょ！」と感情を否定する
・すぐに新しい予定を押しつける（受け止めの時間を飛ばさない）

※お子さんによって合う方法は違います
```

---

## 投稿⑨「白いものしか食べません」

### 枚1（タイトルカード）

```
4:5 vertical illustration, simple loose line art, thick outlines, flat pastel colors, soft warm background (light cream and white gradient). Japanese comedy manga style. No English text anywhere in the image.

Title card for an Instagram carousel post. The character is the main focus, taking up about 60% of the image height. A small boy character (spiky hair, oversized striped t-shirt, in socks) sitting at a small dining table, looking down at a plate with a suspicious expression, arms crossed. On the plate are colorful vegetables which he clearly wants nothing to do with. His small green one-eyed alien plush toy is sitting on the table next to a bowl of white rice, both looking content. Above the character, compact Japanese text: "白いものしか食べません" in round gothic font. The text should be small enough to fit in one or two lines, occupying no more than 50% of the image width. The text is a subtitle, NOT the hero element — the character illustration is the star.

Generous margins from all edges (at least 15% from top and sides). Kawaii deformed style, hand-drawn feel. Eye-catching but clean thumbnail design. No English text or words anywhere.
```

### 枚2（今日の献立）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style. No English text anywhere in the image.

INDOOR dining room scene, warm lighting. A small dining table with two chairs.

The mother (messy short hair, round glasses, beige hoodie, in socks) is placing a colorful plate of food on the table with a proud smile — the plate has rice, broccoli, cherry tomatoes, and a piece of grilled fish. It looks like she put effort into making it appealing. She has a hopeful, slightly nervous expression.

The son (spiky hair, oversized striped t-shirt, in socks) is already seated at the table, looking at the approaching plate with NARROWED suspicious eyes. His head is slightly tilted back, chin pulled in — a "what is THAT" expression. His green alien plush toy is on the table next to him, also seemingly eyeing the plate with suspicion.

The comedy setup: mom's effort vs. the incoming rejection. Kawaii deformed style. No English text or words anywhere.
```

### 枚3（色つきは敵）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style. No English text anywhere in the image.

INDOOR dining table, close-up shot. The plate of colorful food is in the center of the table.

The son is pushing the plate away from himself with BOTH hands, arms fully extended, turning his head to the side with his eyes squeezed shut and mouth pressed into a tight line. His whole body leans away from the plate. It is a firm, full-body REFUSAL — not a tantrum, just absolute "no." His green alien plush toy has been placed BETWEEN himself and the plate like a shield or barrier.

The broccoli, tomatoes, and fish on the plate are drawn with slightly exaggerated colors — extra green, extra red — to emphasize how vivid and "threatening" they look from the boy's perspective. Only the white rice on the plate seems unthreatening.

The mother is visible at the edge of the frame, one hand on her cheek, watching with a resigned "I knew it" half-smile. No English text or words anywhere. Kawaii deformed style.
```

### 枚4（白い世界）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style. No English text anywhere in the image.

INDOOR dining table. The colorful plate has been removed. In its place, the mother has arranged a NEW plate — everything on it is WHITE: white rice shaped into a small ball, tofu cut into cubes, steamed white fish (shiromi), plain udon noodles in a small bowl beside the plate. The plate itself is white. The entire meal is a study in white and cream tones.

The son is now leaning FORWARD toward the plate, eyes wide open with interest, both hands on the table. His mouth is slightly open. He looks genuinely happy and ready to eat. His green alien plush toy has been moved aside — no longer needed as a shield. The boy is already reaching for the rice ball with one hand.

The mother is in the background, chin resting on both hands, watching him eat with a complicated expression — relief that he's eating, but also exhaustion from the effort. A small Japanese text near her: "…今日も白い食卓" (another white dinner table today).

Warm, funny contrast between the all-white meal and the mother's expression. Kawaii deformed style. No English text or words anywhere.
```

### 枚5（母のつぶやき）

```
4:5 vertical manga panel, simple loose line art, thick outlines, flat pastel colors, white/light background. Japanese comedy manga style. No English text anywhere in the image.

INDOOR dining table, after the meal. The white plate is now EMPTY — completely clean, every grain of rice gone. The son is sitting back in his chair with a satisfied, content expression, eyes half-closed, belly slightly round. His green alien plush toy is sitting in his lap, also looking satisfied. He looks genuinely happy and full.

The mother is collecting the empty plate, looking at it, then looking at the fridge where a bag of colorful vegetables is visible through the open door. Her expression is a wry, tired but loving smile. A small Japanese text near her: "栄養バランスは…明日考えよう" (I'll think about nutrition balance...tomorrow).

A warm, funny ending. The boy won this round. Kawaii deformed style. No English text or words anywhere.
```

### 枚6（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【特定の色・食感しか食べない子】

白いもの・柔らかいもの・特定のメーカーだけ——
「偏食」で悩んでいませんか？

🧠 なぜそうなる？
・口の中の感覚が敏感で、食感の違いが苦痛に感じる
・色や見た目で「安全」「危険」を判断している
・わがままや甘えではなく、感覚の特性

✅ こうするといい感じ
・食べられるものを否定せず「これは食べられるね」と認める
・新しい食材は食卓に置くだけから始める（食べなくてOK）
・形や調理法を変えると食べられることもある（同じ食材でも）

🚫 これは逆効果かも
・「一口だけ食べなさい」と無理に口に入れさせる
・「好き嫌いするな」と叱る
・食べないことを他の子と比べる

※お子さんによって合う方法は違います
```

---

## 投稿⑩「同じ動画を100回見る」

### 枚1（タイトルカード）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, soft warm background (light blue and cream gradient). Cute deformed chibi style, hand-drawn feel.

A small boy (spiky hair, oversized striped t-shirt, in socks) sitting cross-legged on the floor in front of a tablet, his face lit by the screen glow, eyes wide and absorbed. His small green one-eyed alien plush toy is sitting next to him, also facing the screen. The boy is the main focus, taking up about 60% of the image height. Above him, compact Japanese title: "同じ動画を100回見る" in round gothic font, no more than 50% of the image width.

Generous margins from all edges (at least 15%). No narration box, no white bar, no frame title. The image contains only the Japanese title above and nothing else — no other text, no other letters, no onomatopoeia, no labels.
```

### 枚2（いつもの光景）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere.

Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor living room, daytime. A small boy (spiky hair, oversized striped t-shirt, in socks) sitting on the floor in front of a tablet propped on a cushion, watching the screen with a big happy smile. His green alien plush toy is next to the tablet, also facing the screen.

The mother (messy short hair, round glasses, beige hoodie, in socks) is in the background folding laundry, glancing over at her son with a calm expression. Warm, cozy living room.
```

### 枚3（止めようとした瞬間）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor living room. The mother stands beside the boy, one hand reaching gently toward the tablet. She has a round speech bubble containing only: "そろそろ終わりにしようか". She looks slightly apologetic.

The boy is hugging the tablet to his chest with both arms, pulling it away from her. His eyes are big round circles of worry. His whole body wraps around the tablet protectively. The green alien plush toy has tipped over on the floor beside him.

The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚4（オチ：クスッ）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor living room. The mother has given up and is now sitting next to her son on the floor. They are both watching the same video on the tablet together. The mother rests her chin on one hand, eyes half-closed, tired but amused. She has a round speech bubble containing only: "これもう10回目…（笑）". The son is leaning forward with a big smile, happy again. The green alien plush toy sits between them, also facing the screen.

Warm, funny, peaceful scene. The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚5（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【同じ動画を繰り返し見る子】

同じ場面・同じ歌・同じ番組——
何百回もリピートすること、ありませんか？

🧠 なぜそうなる？
・ASD児は脳の「予測システム」が強く働くタイプが多い
・同じ動画は展開が100%予測できるため、
　脳が「安全」と判断して安心感を得られる
・新しい刺激の処理が苦手な分、既知の情報を
　繰り返すことで世界を理解しようとしている
・わがままや怠けではなく、脳の情報処理の特性

✅ こうするといい感じ
・「あと2回見たらおしまいね」と終わりを具体的に伝える
・一緒に見て「ここ好きなんだね」と共感する
・区切りのタイミング（動画の終わり）で切り替える

🚫 これは逆効果かも
・途中で突然止める（安心が中断される）
・「また同じの？」「飽きないの？」と否定する

※お子さんによって合う方法は違います
```

---

## 投稿⑪「名前を呼んでも振り向かない」

### 枚1（タイトルカード）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, soft warm background (light green and cream gradient). Cute deformed chibi style, hand-drawn feel.

A small boy (spiky hair, oversized striped t-shirt, in socks) crouching on the floor, focused on blocks in front of him, back turned slightly toward the viewer. His small green one-eyed alien plush toy is beside him. Behind him, a mother figure with her mouth open as if calling out. The boy is the main focus, taking up about 60% of the image height. Above him, compact Japanese title: "名前を呼んでも振り向かない" in round gothic font, no more than 50% of the image width.

Generous margins from all edges (at least 15%). No narration box, no white bar, no frame title. The image contains only the Japanese title above and nothing else — no other text, no other letters, no onomatopoeia, no labels.
```

### 枚2（呼んでみる）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor living room. The son (spiky hair, oversized striped t-shirt, in socks) is sitting on the floor, stacking blocks into a tall tower. His eyebrows are slightly furrowed in concentration. His green alien plush toy is sitting next to the block tower as if supervising.

In the background, the mother (messy short hair, round glasses, beige hoodie, in socks) is standing in the kitchen doorway holding a plate, mouth open wide, one hand cupped near her mouth. She has a round speech bubble containing only: "ごはんだよー".

The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚3（何度も呼ぶ）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere.

Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor living room. Three small scenes stacked vertically showing the mother getting closer each time:

Top scene: Mother calling from the kitchen doorway, normal expression. Son sitting with blocks, not reacting.

Middle scene: Mother now standing right behind the son, both hands cupped around her mouth. Son in the exact same position, building blocks.

Bottom scene: Mother crouching directly behind the son, face close to his back, looking exhausted. Son still building. The block tower is taller now. The green alien plush toy is between them, angled as if looking back at the mother.
```

### 枚4（オチ：クスッ）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor living room, split contrast scene. On the left side, the mother is slumped on the floor, completely exhausted — her hair is messy, dark tired lines under her eyes, one arm draped limp on the ground. She looks like she has been calling out for hours. She has a round speech bubble containing only: "やっと気づいたか（笑）"

On the right side, the boy is sitting on the floor next to his completed tall block tower, finally looking over at his mother with a perfectly calm, innocent, curious face — tilting his head slightly as if noticing her for the very first time. The green alien plush toy is tucked under his arm.

The contrast between her total exhaustion and his fresh, unbothered expression is the comedy. Warm pastel tones, funny wholesome scene.

The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚5（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【名前を呼んでも反応しない子】

何度呼んでも振り向かない。
無視してるの？聞こえてないの？

🧠 なぜそうなる？
・ASD児の脳は「シングルチャンネル処理」の傾向がある
　→ ひとつの作業に集中すると、聴覚からの情報を
　　脳がフィルタリングして遮断してしまう
・定型発達の子は複数の感覚を同時処理できるが、
　この特性の子は「深く集中する代わりに他が入らない」
・聞こえていないのでも無視でもなく、脳の処理方式の違い

✅ こうするといい感じ
・名前だけでなく、肩をぽんぽんなど触覚で知らせる
・視界に入ってから声をかける
・「聞こえたらこっち見てね」と短く伝える

🚫 これは逆効果かも
・遠くから何度も大声で呼ぶ（届いていない）
・「無視しないで！」「聞いてるの！？」と怒る

※お子さんによって合う方法は違います
```

---

## 投稿⑫「シャワーが顔にかかるとパニック」

### 枚1（タイトルカード）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, soft warm background (light aqua and cream gradient). Cute deformed chibi style, hand-drawn feel.

A small boy (spiky hair, oversized striped t-shirt) with both hands covering his face, body slightly crouched, with a few small round water droplet shapes around his head. His small green one-eyed alien plush toy is sitting nearby on a dry surface. The boy is the main focus, taking up about 60% of the image height. Above him, compact Japanese title: "シャワーが顔にかかるとパニック" in round gothic font, no more than 50% of the image width.

Generous margins from all edges (at least 15%). No narration box, no white bar, no frame title. The image contains only the Japanese title above and nothing else — no other text, no other letters, no onomatopoeia, no labels.
```

### 枚2（お風呂タイム・平和）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light warm background. Cute deformed chibi style, hand-drawn feel.

Indoor bathroom scene. A cute, warm-toned bathroom with a small bathtub. The son (spiky hair, small body) is sitting on a bath stool, wrapped in a towel from the waist down. He is playing happily with his green alien plush toy (sitting on the dry edge of the bathtub, safely away from water). The boy looks relaxed and content.

The mother (messy short hair, round glasses, hair tied back with a clip) is behind him, holding a showerhead with a gentle smile. She has a round speech bubble containing only: "頭洗うよー"

Warm, peaceful bathroom atmosphere with steam. The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚3（水が顔に・パニック）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere. Do not render any characters, symbols, or writing of any kind on the image.

Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor bathroom scene. A few small round water droplet shapes from the showerhead have landed on the son's face. The son presses both hands over his face, body curling forward, shoulders raised to his ears. He is shaking his head side to side in distress.

The mother is startled, holding the showerhead away with one hand, her other hand frozen in midair. Her eyes are wide with an "oh no" expression.

The green alien plush toy on the bathtub edge has tilted over from the commotion.
```

### 枚4（母の作戦タイム）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor bathroom scene. The mother is crouching in front of the son, gently placing a dry towel over his face like a mask. The son is sitting still on the bath stool, letting her cover his face with the towel. His small hands are reaching up to hold the towel in place.

The mother has a confident, determined smile. She has a round speech bubble containing only: "タオルで顔ガード作戦"

Behind her on the floor, a small hand basin is ready. The green alien plush toy has been moved to a completely dry spot far away from the bathtub by the boy.

The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚5（オチ：クスッ）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light background. Cute deformed chibi style, hand-drawn feel.

Indoor bathroom scene. The mother is pouring water over the back of the son's head with extreme precision using the small hand basin, tilting it at a careful angle to avoid any water reaching his face. Her posture is intensely focused — tongue sticking out slightly in concentration, one eye squinted shut.

The son sits perfectly still, towel still pressed against his face as a shield. He is peeking out from above the towel with one eye, watching her every move.

The mother has a round speech bubble containing only: "…顔にかけない技術、プロ級になってきた"

The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚6（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【顔に水がかかるのが怖い子】

シャワー・洗顔・プール——
顔に水がかかるとパニックになること、ありませんか？

🧠 なぜそうなる？
・ASD児は触覚の感度が定型発達の数倍高いことがある
・特に顔は三叉神経が集中しており、水の刺激が
　「痛み」に近い強さで脳に伝わってしまう
・さらに顔を覆われる感覚が「窒息の恐怖」と結びつき、
　本能的なパニック反応が起きる
・大げさなのではなく、神経の感度が違う

✅ こうするといい感じ
・手おけで後頭部からゆっくり流す（顔にかけない）
・タオルで顔を覆ってから流す
・「ここまでだよ」と水がかかる範囲を事前に伝える

🚫 これは逆効果かも
・「大丈夫！」と頭からシャワーをかける
・「いつまで怖がるの？」と反応を否定する

※お子さんによって合う方法は違います
```

---

## 投稿⑬「電気パチパチ止まらない」

### 枚1（タイトルカード）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, soft warm background (light yellow and cream gradient). Cute deformed chibi style, hand-drawn feel.

A small boy (spiky hair, oversized striped t-shirt, socks, no shoes — indoor scene) standing on tiptoe reaching up to a light switch on a wall. His finger is on the switch. His eyes are wide and sparkling with intense focus. His small green one-eyed alien plush toy is tucked under his other arm. The room is half-lit, half-dark to show the switching effect. Above the character, compact Japanese title: "電気パチパチ止まらない" in round gothic font, no more than 50% of the image width.

Generous margins from all edges (at least 15%). No narration box, no white bar, no frame title. The image contains only the Japanese title above and nothing else — no other text, no other letters, no onomatopoeia, no labels.
```

### 枚2（シーン1：リビングでくつろぐ母、歩き出す息子）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere. Do not render any characters, symbols, or writing of any kind on the image.

Simple loose line art, thick outlines, flat pastel colors, warm light background. Cute deformed chibi style, hand-drawn feel.

Indoor living room scene, bright and cozy. The mother (messy short hair, round glasses, oversized hoodie, socks) is sitting on the sofa, legs curled up, reading a magazine with a relaxed smile. The ceiling light is on, warm atmosphere.

The son (spiky hair, oversized striped t-shirt, socks) is seen from behind, walking away from the sofa toward the hallway where a light switch is visible on the wall. He is holding his green alien plush toy in one hand, his back facing the viewer. He is heading toward the switch with quiet determination. A peaceful, unsuspecting moment.
```

### 枚3（シーン2：突然の暗闘 — 目だけ）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere. Do not render any characters, symbols, or writing of any kind on the image.

Simple loose line art, thick outlines. Cute deformed chibi style, hand-drawn feel.

Almost entirely dark scene — the room light has been switched off. The background is very dark navy/charcoal. In the darkness, only TWO things are visible: (1) the mother's wide shocked eyes with round glasses floating in the dark on the left side, her eyes are huge white circles with tiny dot pupils expressing total surprise, and (2) a small simple white starburst or spark effect near the light switch area on the right side, suggesting the click sound. Everything else is hidden in darkness. The contrast between the dark background and the bright shocked eyes creates a comedic dramatic effect.
```

### 枚4（シーン3：明るくなる — 振り返る母）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere. Do not render any characters, symbols, or writing of any kind on the image.

Simple loose line art, thick outlines, flat pastel colors, bright warm background. Cute deformed chibi style, hand-drawn feel.

Indoor living room scene, light is back ON — bright and fully lit. The mother is twisting her body around on the sofa, turning to look behind her toward the hallway with a startled, confused expression. Her glasses are slightly crooked, her magazine is half-falling from her hands.

In the hallway behind her, the son is standing on tiptoe with his finger on the light switch, looking perfectly calm and content, completely unbothered. His green alien plush toy is tucked under his other arm. He has a serene, focused expression as if he just completed something very important. A small spark effect near the switch.
```

### 枚5（シーン4：終わらないループ）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere. Do not render any characters, symbols, or writing of any kind on the image.

Simple loose line art, thick outlines, flat pastel colors. Cute deformed chibi style, hand-drawn feel.

Same living room scene divided into 9 small panels arranged in a 3x3 grid within the single image, reading left-to-right, top-to-bottom like a comic strip. Each panel shows the same room from the same angle but alternating between light ON (bright warm colors) and light OFF (dark navy, only eyes visible).

Row 1 (top): Panel 1: bright room, mother on sofa looking startled. Panel 2: dark, mother's wide shocked eyes and glasses glowing in the dark. Panel 3: bright again, mother looking confused, turning around.

Row 2 (middle): Panel 4: dark, mother's eyes now annoyed dots in the dark. Panel 5: bright, mother standing up from sofa with hands on hips. Panel 6: dark, mother's eyes are tired half-circles in the dark.

Row 3 (bottom): Panel 7: bright, mother slumped back on sofa, defeated posture. Panel 8: dark, mother's eyes are barely visible tiny dots — she has completely given up. Panel 9: bright, mother lying face-down on the sofa, totally surrendered.

In ALL 9 panels, the son is in the same position at the light switch in the hallway — on tiptoe, finger on switch, calm and content, holding his green alien plush toy. His expression never changes across any panel. The 9-panel repetition creates a comedic rhythm of escalating maternal exhaustion vs total child serenity.
```

### 枚6（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【電気スイッチをずっとカチカチする子】

パチパチパチパチ……
電気をつけたり消したりが止まらない、ありませんか？

🧠 なぜそうなる？
・「押す→光る/消える」が明確な因果関係で、
　予測通りの結果が毎回得られる安心感がある
・光の変化が視覚的な刺激になり、
　行動そのものが心地よい感覚を生んでいる
　（ABAでは「自動強化」と呼ばれる状態）
・止められないのは「わがまま」ではなく、
　脳が感覚的な報酬を受け取り続けている状態

✅ こうするといい感じ
・「ダメ！」で止めるより、
　同じ感覚を得られる代わりの活動を用意する
　（光るおもちゃ、押すと音が出るボタンなど）
・「10回押したらおしまい」と
　終わりの目安を視覚的に示す
　（指で数える、カードを並べるなど）
・スイッチ遊びの後に好きな活動を設定して
　自然に移行する流れを作る

🚫 これは逆効果かも
・手をつかんで無理にやめさせる
・「もうやめなさい！」と叱る
　→ パニックや癇癪の原因になりやすい

※お子さんによって合う方法は違います
```

---

## 投稿⑭「寝かしつけた後、ひとり反省会の夜」

### 枚1（タイトルカード）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, soft warm background (dark navy blue and soft yellow gradient, nighttime feel). Cute deformed chibi style, hand-drawn feel.

The mother (messy short hair, round glasses, oversized hoodie, socks) sitting alone on a sofa in a dimly lit living room at night, holding an ice cream bar in one hand, with a small wry smile and a slightly tired expression. A warm table lamp glows beside her. Above her, compact Japanese title: "寝かしつけた後、ひとり反省会の夜" in round gothic font, no more than 55% of the image width.

Generous margins from all edges (at least 15%). No narration box, no white bar, no frame title. The image contains only the Japanese title above and nothing else — no other text, no other letters, no onomatopoeia, no labels.
```

### 枚2（シーン1：寝かしつけ完了）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere. Do not render any characters, symbols, or writing of any kind on the image.

Simple loose line art, thick outlines, flat pastel colors, dark soft background with warm tones. Cute deformed chibi style, hand-drawn feel.

Indoor bedroom scene, dimly lit with a small nightlight. The son (spiky hair, oversized striped t-shirt) is sleeping peacefully in his futon, hugging his green one-eyed alien plush toy. His face is completely relaxed and innocent.

The mother (messy short hair, round glasses, oversized hoodie, socks) is sitting beside him on the floor, looking down at his sleeping face with a gentle, tender but tired expression. One hand softly rests near his pillow. Warm, quiet nighttime atmosphere — a moment of peace after a long day.
```

### 枚3（シーン2：リビングで怒ったシーンを回想・苦笑い）

```
4:5 vertical kawaii illustration with zero text. No letters, no words, no speech bubbles, no onomatopoeia, no labels anywhere. Do not render any characters, symbols, or writing of any kind on the image.

Simple loose line art, thick outlines, flat pastel colors, dark soft background. Cute deformed chibi style, hand-drawn feel.

Indoor living room, nighttime. The mother is sitting on the sofa alone, holding a mug of tea, staring off into the middle distance. She has a wry awkward smile with a visible sweat drop on her forehead, eyes slightly wide — the classic "recalling an embarrassing memory" expression.

Above her head, a soft cloud-shaped thought bubble shows a flashback scene: daytime version of herself with an angry red face, mouth wide open yelling, arms raised, standing over the startled little son (who is clutching his green alien plush toy, wide-eyed). The thought bubble is clearly a memory/flashback. The contrast between the quiet nighttime present and the chaotic flashback is the comedy.
```

### 枚4（シーン3：冷静になって少し落ち込む）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, dark soft background. Cute deformed chibi style, hand-drawn feel.

Indoor living room, same nighttime sofa. The wry smile is gone. The mother is now slumped forward slightly, elbows on her knees, hands clasped loosely, looking down at the floor. Her eyes are half-closed and downturned, her mouth is a small flat line. She is not crying — just quietly reflecting with a gentle, slightly sad expression. The tea mug sits on the side table.

Above her head, a cloud-shaped THOUGHT bubble (not a speech bubble — the cloud-shaped kind with small trailing circles rising from her head to indicate inner thoughts) containing only: "怒りすぎたな…"

The thought bubble must clearly be a thought (cloud shape with trailing small bubbles connecting to her head), NOT a speech bubble with a pointed tail from her mouth. The atmosphere is quiet, introspective but not depressing — the universal "I was too harsh today" moment every parent has.

The image contains only the mother's Japanese thought bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚5（シーン4：冷蔵庫前でアイス・気合い）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, dark warm background. Cute deformed chibi style, hand-drawn feel.

Indoor kitchen, nighttime. The mother is standing in front of the open refrigerator, the fridge light illuminating her face with a warm glow. She is holding an ice cream bar that she just took out, already half-unwrapped. Her expression has shifted — a small determined smile, eyes a bit brighter, shoulders lifted slightly. A tiny fist pump gesture with her free hand. She looks refreshed, like she's just given herself permission to reset.

She has a round speech bubble containing only: "明日はもうちょっとだけ、優しくなれますように"

The fridge light and her small hopeful smile make the scene warm and uplifting, not sad. A small moment of self-care and resolve.

The image contains only the mother's Japanese speech bubble above and nothing else — no other text, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚5（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【今日も怒りすぎた、と思った夜に】

怒鳴ってしまった。声を荒げてしまった。
寝顔を見て「ごめんね」ってなる夜。

💭 まず知ってほしいこと
・怒ってしまうのは、それだけ
　毎日がんばっている証拠
・完璧な親なんていない
・「怒りすぎたかも」と振り返れる時点で、
　ちゃんと子どものことを考えている

✅ 自分に優しくする方法
・「今日も一日終えた」、それだけで十分
・好きなものを食べる、飲む（小さなご褒美）
・同じ気持ちの人の投稿を読む
　（あなただけじゃないです）

🚫 自分を追い詰めないで
・「もっとちゃんとしなきゃ」と自分を責めない
・他の家庭と比べない
・辛いときは相談窓口に頼っていい

※あなたは十分がんばっています
```

---

## 投稿⑮「"いってきます"の儀式」

### 枚1（タイトルカード）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, soft warm background (light orange and cream gradient, morning feel). Cute deformed chibi style, hand-drawn feel.

A small boy (spiky hair, oversized striped t-shirt, shoes on) standing at a front door entrance (genkan), carefully touching the doorknob with one hand. His green one-eyed alien plush toy is sitting on the shoe shelf beside him. The mother (messy short hair, round glasses, shoes on) stands behind him, checking her watch with a patient but resigned expression. Above them, compact Japanese title: "「いってきます」の儀式" in round gothic font, no more than 50% of the image width.

Generous margins from all edges (at least 15%). No narration box, no white bar, no frame title. The image contains only the Japanese title above and nothing else — no other text, no other letters, no onomatopoeia, no labels.
```

### 枚2（儀式①：服の着心地が納得いくまで直す）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light warm background. Cute deformed chibi style, hand-drawn feel.

Indoor child's bedroom, morning. The son (spiky hair, wearing his oversized striped t-shirt and shorts) is standing in the middle of the room, looking down at his t-shirt with an intensely focused serious expression. He is pulling at the hem of his shirt, then tugging at the neckline, then smoothing a wrinkle on the sleeve — trying to make it feel "just right" on his body. His green one-eyed alien plush toy sits on the bed watching him.

The mother (messy short hair, round glasses, oversized hoodie, socks) is standing in the doorway holding his school bag, watching with a patient warm smile. Morning sunlight through the window.

In the top-left corner of the image, inside a small rounded rectangle label with a pastel yellow background, compact Japanese text: "儀式①　服の着心地がしっくりくるまで" in round gothic font. The label is small (no more than 45% of image width) and placed cleanly in the corner like a caption, NOT as a narration box across the top. The label is the only text in the image — no other letters, no speech bubbles, no onomatopoeia, no narration box, no frame title.
```

### 枚3（儀式②：カバンの中身の配置が納得いくまで並べ直す）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light warm background. Cute deformed chibi style, hand-drawn feel.

Indoor living room, morning. The son is sitting on the floor, his school bag open beside him, and he has taken all his belongings out and lined them up on the floor — a water bottle, a handkerchief, a small notebook, a pencil case, and his green alien plush toy. He is carefully adjusting the angle of the pencil case with his fingertip, his face deeply serious and focused. Some items are already placed back into the bag but he is rearranging them with intense concentration, seeking a "just right" arrangement.

The mother is sitting on the sofa behind him, one elbow on the armrest, chin in hand, watching with a calm patient smile. A clock is visible on the wall.

In the top-left corner of the image, inside a small rounded rectangle label with a pastel yellow background, compact Japanese text: "儀式②　カバンの中身がしっくりくるまで" in round gothic font. The label is small (no more than 45% of image width) and placed cleanly in the corner like a caption. The label is the only text in the image — no other letters, no speech bubbles, no onomatopoeia, no narration box, no frame title.
```

### 枚4（儀式③：ドアを閉めた音が納得いくまで閉め直す）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light warm background. Cute deformed chibi style, hand-drawn feel.

Outdoor scene, just outside the front door of a Japanese house. The son (spiky hair, oversized striped t-shirt, shoes on, his green alien plush toy tucked under one arm) is standing at the threshold with his hand on the door handle, intensely focused on the act of closing the door. His ear is slightly tilted toward the door, listening carefully to the sound it makes as it shuts. Small visual motion lines near the door show it has just been closed — and will be opened and re-closed again.

Behind him, on the pavement, the mother stands holding her bag, watching with a warm patient but slightly amused expression, head tilted. Morning sunlight.

In the top-left corner of the image, inside a small rounded rectangle label with a pastel yellow background, compact Japanese text: "儀式③　ドアの閉まる音がしっくりくるまで" in round gothic font. The label is small (no more than 50% of image width) and placed cleanly in the corner like a caption. The label is the only text in the image — no other letters, no speech bubbles, no onomatopoeia, no narration box, no frame title.
```

### 枚5（オチ：20分経過・ふりだしに戻る）

```
4:5 vertical kawaii illustration. Simple loose line art, thick outlines, flat pastel colors, white/light warm background. Cute deformed chibi style, hand-drawn feel.

Indoor child's bedroom, same room as scene 1. The son is back in the bedroom — he has returned from the front door all the way to the beginning. He is standing in the middle of the room again, pulling at the hem of his t-shirt with the same intense focus, restarting ritual ① from scratch. The door's sound was not "right," so he had to reset everything. His green alien plush toy is tucked under his arm. Calm, focused, completely undisturbed.

The mother is standing in the doorway, still holding his school bag, but now slumped slightly, staring at her wristwatch with a mildly fed-up exhausted expression — small sweat drop on forehead, half-closed tired eyes, resigned downturned mouth. Not angry, just "oh no, again" level of done. A large wall clock in the background visibly shows 20 minutes have passed.

In the top-left corner, inside a small rounded rectangle label with a pastel pink background, compact Japanese text: "20分経過…" in round gothic font. In the bottom area of the image, a second small rounded rectangle label with pastel pink background contains: "納得がいくまで続きます" in round gothic font. Both labels are small (no more than 50% of image width each) and placed cleanly as captions.

The only text in the image is these two Japanese caption labels — no speech bubbles, no other letters, no onomatopoeia, no narration box, no frame title.
```

### 枚6（Tips — テキスト画像）

Canvaで作成。テキストのみ。
背景色: クリーム or 薄いイエロー

テキスト内容:

```
【毎日同じ手順を繰り返す子】

出かける前、寝る前、食事の前——
必ず同じ順番で同じことをする。
ひとつ飛ばすと、最初からやり直し。

🧠 なぜそうなる？
・決まった手順をこなすことで
　「次に何が起きるか」を予測できる安心感を得ている
・予測できない状況が不安なので、
　自分でコントロールできる儀式を作っている
・わがままではなく、
　不安を自分で管理する方法のひとつ

✅ こうするといい感じ
・儀式自体は否定せず、見守る
・時間がかかりすぎる場合は
　「あと1回で出発しよう」と予告する
・手順を絵カードにして「見える化」すると
　本人も安心しやすい

🚫 これは逆効果かも
・途中で「もういいから早く！」と中断する
・「そんなことしなくていい」と否定する

※お子さんによって合う方法は違います
```

---

## キャプション＆ハッシュタグ

### 2026年ルール

- ハッシュタグは**最大5個**（2025年末に30→5に変更）
- ハッシュタグよりも**キャプション内のキーワード**が検索に影響する
- 1行目が最重要（フィードに表示されるのは最初の1行のみ）
- 「保存」「シェア（送信）」を促すCTAが最重要指標

### ハッシュタグセット（固定5個）

```
#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

※オリジナルタグ（#今日もわが家は通常運転）を必ず入れてブランド化

---

### 投稿①キャプション

```
帰り道を変えようとしたら、まさかのフリーズ。

いつもの道じゃないと足が動かないらしい。
結局いつもの道に戻って、ご機嫌スキップ再開。
…知ってた。

「わかる…！」って方、いいねで教えてください 🙋
最後のページにちょっとしたヒントも載せてます。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿②キャプション

```
新しい服を着せた瞬間、全力で脱ごうとする息子。

感覚が敏感な子にとって、タグは敵。
朝からハサミ片手にタグと格闘する母です。

「わかる…！」って方、シェアで届けてもらえると嬉しいです 📩
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿③キャプション

```
スーパーの店内放送で、突然フリーズした息子。

大人にはただの日常の音。
この子にはそうじゃなくて、しゃがんで手を握った。
それだけでよかった日。

同じ経験のある方、コメントで聞かせてください 💬
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿④キャプション

```
掃除機のスイッチを入れた瞬間、全力で逃走する息子。

音が怖い子にとって、掃除機は最終兵器。
ソファの裏からエイリアン人形を先に出して安全確認してた。

同じ経験のある方、コメントで聞かせてください 💬
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑤キャプション

```
ミニカーを一列に並べる息子。1台でもずれると最初からやり直し。

走らせようとしたら秒で奪い返された。
どうやらこれは展覧会だったらしい。

「わかる…！」って方、いいねで教えてください 🙋
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑥キャプション

```
砂場で指先をちょんっと触っただけで、世界が終わった顔の息子。

手が汚れるのが苦手な子、うちだけじゃないはず。
ウェットティッシュは常に3パック装備です。

同じ装備の方、シェアで仲間に届けてください 📩
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑦キャプション

```
「帰るよ」と言ってから30分、まだブランコにいる。

好きなことをやめるのに大きなエネルギーがいる子。
気づいたら公園に2人だけ。でも、まあいいか。

同じ経験のある方、コメントで聞かせてください 💬
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑧キャプション

```
「今日は公園！」と伝えた直後に雨。

予定が変わると受け入れられない子。靴を脱がない。
クッションで「おうち公園」作ったら、ちょっとだけ笑ってくれた。

「わかる…！」って方、いいねで教えてください 🙋
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑨キャプション

```
色のついた食べ物を全力で拒否する息子。

白米、豆腐、うどん、白身魚。うちの食卓はだいたい白い。
栄養バランスは…明日考えよう。

「わかる…！」って方、いいねで教えてください 🙋
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑩キャプション

```
同じ動画を朝から晩まで再生し続ける息子。

セリフも効果音も完全に暗記済み。
止めると怒るけど、一緒に見てると安心するらしい。

同じ経験のある方、コメントで聞かせてください 💬
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑪キャプション

```
名前を呼んでも振り向かない息子。

聞こえてないわけじゃない。集中してるだけ。
肩をぽんぽんしたら、ちゃんとこっち見てくれた。

「わかる…！」って方、シェアで届けてもらえると嬉しいです 📩
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑫キャプション

```
お風呂でシャワーが顔にかかった瞬間、世界が終わった。

顔に水がかかるのが怖い子。
手おけ作戦で、なんとか今日も洗えました。

同じ経験のある方、コメントで聞かせてください 💬
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑬キャプション

```
電気のスイッチ、パチッ、パチッ、パチッ。
部屋が明るくなったり暗くなったり、終わらない。

止めようとすると悲しむし、
そっと見守ってたら30分経ってた夜。

「わかる…！」って方、いいねで教えてください 🙋
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑭キャプション

```
寝かしつけた後、静かなリビングでひとり反省会。
「今日、ちょっと怒りすぎたな…」

アイスを食べて、小さくガッツポーズ。
明日はもうちょっとだけ、優しくなれますように。

同じ経験のある方、コメントで聞かせてください 💬
最後のページ、今回は自分へのヒントです。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

### 投稿⑮キャプション

```
「いってきます」までが、長い。

服の着心地、カバンの中身、ドアを閉めた音——
ぜんぶ"しっくりくる"まで、何度でもやり直し。
気がついたら20分経ってた朝。

「わかる…！」って方、いいねで教えてください 🙋
最後のページにちょっとしたヒントあります。

#今日もわが家は通常運転 #育児漫画 #発達 #ASD #自閉スペクトラム症
```

---

### キャプション設計のロジック


| 要素                  | 狙い                                   |
| ------------------- | ------------------------------------ |
| **1行目：状況を短く**       | フィードで見える唯一の行。「何これ？」と思わせて本文を開かせる      |
| **2〜3行目：あるある共感**    | 軽いユーモアで共感を引き出す                       |
| **CTA①：エンゲージメント誘導** | いいね/シェア/コメントを明確に依頼（投稿ごとに変える）         |
| **CTA②：Tips誘導＋保存**  | 最後のページに誘導しつつ「保存」を促す。保存率はアルゴリズム最重要指標  |
| **ハッシュタグ：最後に5個**    | オリジナル1＋ジャンル4。キャプション本文にキーワードを自然に散りばめる |


---

## 生成の手順

1. まずキャラデザインシートを生成 → キャラの見た目を確定
2. 投稿①の枚1（タイトルカード）〜枚4を1枚ずつ生成
3. 気に入ったら②③も同様に生成
4. Tips枚はCanvaでテキスト画像として作成
5. キャプションをコピペして投稿

