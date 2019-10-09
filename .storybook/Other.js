import React from "react";
import { createGlobalStyle } from "styled-components";

/**
 * These should go into their own separate file and imported in once. Same story for _app.js Need to come up with a strategy for globla styles.
 */
const GlobalStyle = createGlobalStyle`
  /* region Open Sans */
  
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');
  
  /* endregion */
  
  /* region Gideon */
  
  @font-face {
    font-family: Gideon;
    font-style:  normal;
    font-weight: 400;
  
    /* stylelint-disable indentation */
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/gideon/20160525/gideon.eot');
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/gideon/20160525/gideon.eot?#iefix') format('embedded-opentype'),
    url('https://edge.ldscdn.org/cdn2/common/fonts/gideon/20160525/gideon.woff2') format('woff2'),
    url('https://edge.ldscdn.org/cdn2/common/fonts/gideon/20160525/gideon.woff') format('woff'),
    url('https://edge.ldscdn.org/cdn2/common/fonts/gideon/20160525/gideon.ttf') format('truetype'),
    url('https://edge.ldscdn.org/cdn2/common/fonts/gideon/20160525/gideon.svg#gideon_ldsicnregular') format('svg');
    /* stylelint-enable indentation */
  }
  
  /* endregion */
  
  /* region Zoram (Sans Backup) */
  
  /* region Glyphicons Halfling */
  
  @font-face {
    font-family: 'Glyphicons Halflings';
    font-weight: 300;
    font-style: normal;
    
    /* stylelint-disable indentation */
    /* these fonts are loaded in with the '-s' flag from storybook */
    src: url('/fonts/glyphicons-halflings-regular.eot');
    src: url('fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'),
    url('/fonts/glyphicons-halflings-regular.woff') format('woff'),
    url('/fonts/glyphicons-halflings-regular.ttf') format('truetype'),
    url('/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
    /* stylelint-enable indentation */
  }
  
  /* endregion */  
  
  @font-face {
    font-family: Zoram;
    font-weight: 300;
    font-style:  normal;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWeb-Light-Normal.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWeb-Light-Normal.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  @font-face {
    font-family: Zoram;
    font-weight: 300;
    font-style:  italic;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWeb-Light-Italic.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWeb-Light-Italic.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  
  @font-face {
    font-family: Zoram;
    font-weight: 400;
    font-style:  normal;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWeb-Regular-Normal.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWeb-Regular-Normal.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  @font-face {
    font-family: Zoram;
    font-weight: 400;
    font-style:  italic;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWeb-Regular-Italic.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWeb-Regular-Italic.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  
  @font-face {
    font-family: Zoram;
    font-weight: 600;
    font-style:  normal;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-SemiBold-Normal.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-SemiBold-Normal.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  @font-face {
    font-family: Zoram;
    font-weight: 600;
    font-style:  italic;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-SemiBold-Italic.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-SemiBold-Italic.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  
  @font-face {
    font-family: Zoram;
    font-weight: 700;
    font-style:  normal;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-Bold-Normal.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-Bold-Normal.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  @font-face {
    font-family: Zoram;
    font-weight: 700;
    font-style:  italic;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-Bold-Italic.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-Bold-Italic.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  
  @font-face {
    font-family: Zoram;
    font-weight: 800;
    font-style:  normal;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-ExtraBold-Normal.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-ExtraBold-Normal.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  @font-face {
    font-family: Zoram;
    font-weight: 800;
    font-style:  italic;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-ExtraBold-Italic.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/zoram/latest/Zoram-GWebExt-ExtraBold-Italic.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  /* endregion */
  
  
  
  /* region Pahoran (Serif Backup) */
  
  @font-face {
    font-family: Pahoran;
    font-style:  normal;
    font-weight: 400;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/pahoran/latest/Pahoran-GWebExt-Regular-Normal.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/pahoran/latest/Pahoran-GWebExt-Regular-Normal.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  @font-face {
    font-family: Pahoran;
    font-style:  italic;
    font-weight: 400;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/pahoran/latest/Pahoran-GWebExt-Regular-Italic.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/pahoran/latest/Pahoran-GWebExt-Regular-Italic.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  
  @font-face {
    font-family: Pahoran;
    font-style:  normal;
    font-weight: 700;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/pahoran/latest/Pahoran-GWebExt-Bold-Normal.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/pahoran/latest/Pahoran-GWebExt-Bold-Normal.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  @font-face {
    font-family: Pahoran;
    font-style:  italic;
    font-weight: 700;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/pahoran/latest/Pahoran-GWebExt-Bold-Italic.woff2') format('woff2'),
         url('https://edge.ldscdn.org/cdn2/common/fonts/pahoran/latest/Pahoran-GWebExt-Bold-Italic.woff') format('woff'); /* stylelint-disable-line indentation */
  }
  
  /* endregion */
  
  
  
  /* region Helam (Slab) */
  
  @font-face {
    font-family: Helam Slab;
    font-style:  normal;
    font-weight: 300;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/helam/20141031/Helam-Slab-GWebExt-Light.woff') format('woff');
  }
  
  @font-face {
    font-family: Helam Slab;
    font-style:  normal;
    font-weight: 400;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/helam/20141031/Helam-Slab-GWebExt-Regular.woff') format('woff');
  }
  
  @font-face {
    font-family: Helam Slab;
    font-style:  italic;
    font-weight: 400;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/helam/20141031/Helam-Slab-GWebExt-Italic.woff') format('woff');
  }
  
  @font-face {
    font-family: Helam Slab;
    font-style:  normal;
    font-weight: 700;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/helam/20141031/Helam-Slab-GWebExt-Bold.woff') format('woff');
  }
  
  @font-face {
    font-family: Helam Slab;
    font-style:  italic;
    font-weight: 700;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/helam/20141031/Helam-Slab-GWebExt-BoldItalic.woff') format('woff');
  }
  
  @font-face {
    font-family: Helam Slab;
    font-style:  normal;
    font-weight: 800;
  
    src: url('https://edge.ldscdn.org/cdn2/common/fonts/helam/20141031/Helam-Slab-GWebExt-Extra-Bold.woff') format('woff');
  }
  
  /* endregion */
`;

class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <div>{this.props.children}</div>
      </>
    );
  }
}

export default App;
