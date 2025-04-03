import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/components/Main.module.scss";

// import collage1 from "@/img/collage-1.jpg";
// import collage2 from "@/img/collage-2.jpg";
import collage from "@/img/third-collage.jpg";
import cat from "@/img/cat.jpg";
import TypewriterAnimation from "@/components/TypewriterAnimation";

const TheThird = () => {
    const [page, setPage] = useState(0);

    const audioMusic = useRef<HTMLAudioElement | null>(null);
      const handlePlayMusic = (ref: any, stopOtherAudio: boolean = false) => {
        if (ref.current) {
          // Stop the other audio if necessary
          // if (stopOtherAudio && audioRain.current) {
          //   audioRain.current.pause();
          //   audioRain.current.currentTime = 0; // Reset audio to the start
          // }
    
          ref.current.play().then(() => {
            ref.current.volume = 0.35;
            ref.current.loop = true;
          });
        }
      };
  
  return (
    <div className={`${styles.nihon} ${styles.thethird}`}>
      {/* <img className={styles.one} src={collage1.src} alt="" /> */}
      <img className={styles.two} src={collage.src} alt="" />
      <audio ref={audioMusic} src="/honey.mp3" />

      {/* <Counter dateInput="2025-02-17T18:40:00.000Z" /> */}
      {page === 0 && <div className={styles.block} style={{textAlign:'center'}}><button onClick={(e)=>{
        e.preventDefault();
        e.stopPropagation();
        handlePlayMusic(audioMusic, true);
      }}>Click here to play audio.</button><br/><p className={styles.page0}>Use the button <span>{'<'}</span> below to go back 1 page, and <span>{'>'}</span> to go to the next one.</p></div>}
      {page === 1 && <div className={styles.block}><TypewriterAnimation text="こんにちは、元気でいてくれることを願っています。まず、ここ数日間一緒に過ごしたことが私にとってどれほど大切だったかを伝えたかったです。私の最も大きな目標は、あなたと共に過ごす時間を最大限に楽しむことでした。私たちが一緒に作り上げているこの物語がとても美しいものだと感じています。" /></div>}
      {page === 2 && <div className={styles.block}><TypewriterAnimation text="心から感謝しています。特にあなたのホスピタリティは、あなたの最も素晴らしい面だと思います。私がここに来たとき、あなたは私に部屋を改装させてくれて、私たちの生活をもっと快適にするために尽力してくれました。あなたのおかげで、私たちの生活が大きく変わりました。" /></div>}
      {page === 3 && <div className={styles.block}><TypewriterAnimation text="あなたが私のために時間を割いてくれたこと、私たちの時間を共に過ごしてくれたこと、そしてあなたのスペースを私と共有してくれたことに感謝しています。さらに、小さなベッドを一緒に使ってくれたこと、そして私が頑固で、ふとんで寝ることを避けてあなたと一緒に寝るのに抵抗したときも我慢してくれたことに感謝しています。それが私にとって大切なことだとわかっていましたが、私たちが一緒に過ごす時間をもっと健康的で充実したものにするために、あなたがしてくれたことが本当にありがたかったです。" /></div>}
      {page === 4 && <div className={styles.block}><TypewriterAnimation text="あなたが寝ている間に、私の体温で温もり、愛情を伝えたかったです。これが私たちにとってとても特別なことであり、手をつなぎ、抱きしめ合い、私たちの関係を深めるすべての瞬間が、愛と絆を感じさせてくれました。" /></div>}
      {page === 5 && <div className={styles.block}><TypewriterAnimation text="あなたが私をいろいろな場所に連れて行ってくれたことにも感謝しています。予想外の美しい場所や素晴らしいビーチを一緒に見て回り、共に素晴らしい時間を過ごしました。それらの瞬間は、私たちの人生において本当に特別で、美しい思い出として心に残っています。そして、あなたが私にたくさんの時間を費やしてくれたことにも感謝しています。そのおかげで、私たちの関係が深まりました。" /></div>}
      {page === 6 && <div className={styles.block}><TypewriterAnimation text="また、時々私が少し厳しくしてしまったことに対して謝りたいです。でも、あなたが泣いているのを見ることほど辛いことはありません。愛する人が悲しんでいるのを見ることは、私にとって耐えられないことだからです。私はいつも、私たちの関係を良いものに保つために最善を尽くしたいと思っています。私にとって最も大切なことは、愛する人が幸せでいることだと思っています。だからこそ、あなたが良い状態でいることを何よりも大切にしてきました。" /></div>}
      {page === 7 && <div className={styles.block}><TypewriterAnimation text="私はあなたを笑顔にすること、違う視点で物事を考える手助けをすること、そして今この瞬間に集中して、最善を尽くすことを心がけてきました。私の人生の目標は、周りの人たちが最良の自分を見つけられるように支えることだと思っています。そして、あなたがそれを感じ、成長していくのを見ることが、私の最も大きな幸せです。" /></div>}
      {page === 8 && <div className={styles.block}><TypewriterAnimation text="そして、私は気づきました。どれだけ私はあなたと一緒にいたいか、そしてその気持ちは確信に変わったことを。カラオケの日に、あなたが私が探していた全て以上の存在であることを確信しました。あなたは私が求めていた全て、そしてそれ以上のものです。" /></div>}
      {page === 9 && <div className={styles.block}><TypewriterAnimation text="残念ながら、これからしばらくは私たちにとって厳しい日々が続くでしょう、距離があるからです。でも、私たちが作り上げている物語には深い信念を持っています。そして、もう一度言いますが、私はあなたをこれまでに感じたことのない形で愛しています。私たちの関係がうまくいくように、私はすべてを尽くすつもりです。あなたも私と同じ気持ちでいてくれていると感じていますし、私たちの未来を築くために努力したいというあなたの気持ちを感じています。" /></div>}
      {page === 10 && <div className={styles.block}><TypewriterAnimation text="だからこそ、もっと自分に対しても、私に対しても、そして私たちの関係に対しても、もっと忍耐強くいてほしいと思います。そして、私たちが毎日一緒に過ごせる日が来ることを決して忘れないでください。いつか、私たちは一緒に暮らし、誰も、何も、時間さえも私たちを引き離すことはできません。" /></div>}
      {page === 11 && <div className={styles.block}><TypewriterAnimation text="愛しているよ、Aki。これまでのすべての日々に感謝しています。私にとって最良の自分を引き出してくれてありがとう。私の全ての愛を込めて、Willian。" /></div>}
      {page === 12 && <div className={styles.block}><TypewriterAnimation text="私たちの関係の象徴として、家のあちこちに8匹の折り紙の猫を隠しました。見つけたら集めて、ぜひ全て揃ったら見せてください。それぞれの猫は、私たちが一緒に過ごした1ヶ月を表しています。頑張って探してね！" /><br/><img className={styles.cat} src={cat.src}/> </div>}
      <h3>Page {page} / 12</h3>
     
      <div className={styles.bottom}>
        <button onClick={()=> setPage(prev => prev - 1)} disabled={page <= 0}>{'<'}</button>
        <button onClick={()=> setPage(prev => prev + 1)} disabled={page >= 12}>{'>'}</button>
      </div>
    </div>
  );
};
  
export default TheThird;
