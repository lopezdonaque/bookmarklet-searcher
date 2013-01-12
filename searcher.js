
// Do not use "//" for comments
// We use a bookmarklet to avoid to create an extension for each navigator

//javascript:

window.searchs =
[
  {
    name: 'Exvagos',
    url: 'http://exvagos.com/search.php?do=process&titleonly=1&forumchoice[]=294&forumchoice[]=26&query=%s'
  },
  {
    name: 'Hdvagos',
    url: 'http://www.hdvagos.com/search.php?keywords=%s&sr=topics'
  },
  {
    name: 'hdzone',
    url: 'http://www.hdzone.li/foro/search.php?do=process&titleonly=1&query=%s'
  },
  {
    name: 'quebajamos',
    url: 'http://www.quebajamos.li/search.php?do=process&titleonly=1&query=%s'
  },
  {
    name: 'todohdtv',
    url: 'http://foro.todohdtv.com/search.php?keywords=%s&terms=all&author=&sc=1&sf=titleonly&sk=t&sd=d&sr=topics&st=0&ch=300&t=0&submit=Buscar'
  },
  {
    name: 'solohdnet46',
    url: 'http://solohdnet46.net/index.php?action=search2',
    parameters:
    {
      advanced: 1,
      search: '%s',
      searchtype: 1,
      userspec: '*',
      sort: 'relevance|desc',
      subject_only: 1,
      minage: 0,
      maxage: 9999,
      'brd[3]': 3,
      'brd[40]': 40,
      'brd[41]': 41,
      'brd[33]': 33,
      'brd[7]': 7,
      'brd[8]': 8,
      'brd[9]': 9,
      'brd[10]': 10,
      'brd[11]': 11,
      'brd[20]': 20,
      'brd[32]': 32,
      'brd[19]': 19
      /*submit: 'Buscar'*/
    }
  }
];

var Searcher =
{

  start: function()
  {
    document.open();

    var page_tpl =
      '<html>' +
      '<head>' +
        '<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />' +
        '<script src="http://code.jquery.com/jquery-1.8.3.js"></script>' +
        '<script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>' +
      '</head>' +
      '<body>' +
        this._get_tabs_html() +
      '</body>' +
      '</html>';

    document.write( page_tpl );
    document.close();
  },

  _get_tabs_html: function()
  {
    var tabs = [];
    var contents = [];

    for( var i = 0; i < window.searchs.length; i++ )
    {
      var item = window.searchs[ i ];
      tabs.push( '<li><a href="#tabs-' + i + '">' + item.name + '</a></li>' );

      contents.push( '<div id="tabs-' + i + '"><iframe name="iframe-' + i + '" style="width: 100%; height: 80%;" src="' + item.url + '"></iframe></div>' );

      if( item.parameters )
      {
        var form = '<form name="form-' + i + '" action="' + item.url + '" method="POST" target="iframe-' + i + '">';

        $.each( item.parameters, function( key, value )
        {
          form += '<input type="hidden" name="' + key + '" value="' + value + '">';
        });

        form += '</form><script> document.forms[ "form-' + i + '" ].submit();</script>';
        contents.push( form );
      }
    }

    var html =
      '<div id="tabs">' +
        '<ul>' + tabs.join( '' ) + '</ul>' +
        contents.join( '' ) +
      '</div>' +
      '<script> $( "#tabs" ).tabs(); </script>';

    return html;
  }

};

Searcher.start();
