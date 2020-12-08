import React, { Component } from "react";
import styled from "styled-components";

const Div = styled.div`
  margin: 75px 0px;
`;

export class OurTeam extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Div className="container">
        <h1>Our Team</h1>
        <div>
          <h2>CEO</h2>
          <h4>Loh</h4>
          <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book. It usually begins with:
          </p>
          <p>
            Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig
            sausage prosciutto chicken spare ribs salami picanha doner. Kevin
            capicola sausage, buffalo bresaola venison turkey shoulder picanha
            ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs
            andouille bacon sausage. Ground round jerky brisket pastrami shank.
          </p>
        </div>
        <div>
          <h2>CFO</h2>
          <h4>Wil</h4>
          <p>
            The purpose of lorem ipsum is to create a natural looking block of
            text (sentence, paragraph, page, etc.) that doesn't distract from
            the layout. A practice not without controversy, laying out pages
            with meaningless filler text can be very useful when the focus is
            meant to be on design, not content.
          </p>
          <p>
            Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin.
            Halvah croissant candy canes bonbon candy. Apple pie jelly beans
            topping carrot cake danish tart cake cheesecake. Muffin danish
            chocolate soufflé pastry icing bonbon oat cake. Powder cake jujubes
            oat cake. Lemon drops tootsie roll marshmallow halvah carrot cake.
          </p>
        </div>
        <div>
          <h2>CTO</h2>
          <h4>Son</h4>
          <p>
            The passage experienced a surge in popularity during the 1960s when
            Letraset used it on their dry-transfer sheets, and again during the
            90s as desktop publishers bundled the text with their software.
            Today it's seen all around the web; on templates, websites, and
            stock designs. Use our generator to get your own, or read on for the
            authoritative history of lorem ipsum.
          </p>
          <p>
            Just say anything, George, say what ever's natural, the first thing
            that comes to your mind. Take that you mutated son-of-a-bitch. My
            pine, why you. You space bastard, you killed a pine. You do? Yeah,
            it's 8:00. Hey, McFly, I thought I told you never to come in here.
            Well it's gonna cost you. How much money you got on you?
          </p>
        </div>
      </Div>
    );
  }
}

export default OurTeam;
