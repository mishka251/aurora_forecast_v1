  var TabWidget = function (widgetCode) {
    this.triggerId = widgetCode + '-tabTrigger';
    this.entityId = widgetCode + 'Widget';
    this.buttonTitle = 'Швейцар Замки';

    this.addToTabList = function () {
        let tabButtonHTML = "<div class=\"card-tabs__item js-card-tab\" data-id=\"" + this.entityId + "\" id=\"" + this.triggerId + "\">\n" +
            "    <span class=\"card-tabs__item-inner\" title=\"" + this.buttonTitle +"\">" + this.buttonTitle + "</span>\n" +
            "</div>";

        let tabHTML = "<div id=\"" + this.entityId + "\" class=\"linked-form-holder catalog_elements-in_card\" style=\"display: none;\">\n" +
            "    <div class='custom-widget-tab-content'>\n" +
            "<center><button id=\"openLock\" class=\"btn btn-success\">Открыть замок</button>"+
            "<p id=\"amoText\"><strong>Для того, чтобы получить код доступа, нажмите на кнопку</h4></strong></p>"+
            "<button id=\"getPass\" class=\"btn btn-success\">Получить код</button>"+
            "<p id = \"inputP\" style=\"display: none;\">Введите код для изменения: <input id = \"idInput\" type=\"text\" /></p>"+
            "<button id=\"changePass\" style=\"display: none;\" class=\"btn btn-success\">Заменить код</button></center>"+
            "    </div>\n" +
            "</div>\n";

        $('#card_tabs').append(tabButtonHTML);
        $('.js-linked_elements_wrapper').append(tabHTML);
    };

    this.initWidget = function () {
        this.addToTabList();
    };
    this.hideOpenTabs = function () {
        $('.js-card-fields__linked-block, .js-card-main-fields, .js-linked_elements_wrapper div:not(#'+this.entityId+' div)').hide();
    };

    this.deselectTabButtons = function () {
        $('.js-card-tab').removeClass('selected');
    };

    this.moveTabSlider = function () {
        let $tabButton = $('#'+this.triggerId);
        let sliderPosition = $tabButton.position().left;
        let sliderWidth = $tabButton.outerWidth();

        $('.card-tabs-slider').css({left: sliderPosition, width: sliderWidth});
    };

    this.showTab = function () {
        this.hideOpenTabs();
        this.deselectTabButtons();
        $('#'+this.entityId).show();
        $('#'+this.triggerId).addClass('selected');
        this.moveTabSlider();
    };

    this.hideTab = function () {
        $('#'+this.entityId).hide();
        $('#'+this.triggerId).removeClass('selected');
    };
    
    this.bindActions = function () {
        $('#'+this.triggerId).on('click', this.showTab.bind(this));
        $(document).on('click', '.js-card-tab:not(#'+this.triggerId+')', this.hideTab.bind(this));
        $("#openLock").on("click",async function(){
        var x = document.getElementsByClassName("tag");
        var fake = document.getElementsByClassName("linked-form__field__label");
        fake.style.display = 'none';
        const apartId = x[1].textContent
        const manageBalanceData = {
        data :
        {phone : '+79870389135',
        service : 'amocrm',
        method : 'openLock',
        args: [apartId]}
        }
        const str = JSON.stringify(manageBalanceData);
        let redUrl = 'https://9a10461e2605.ngrok.io/test-shveitsar/us-central1/v1dev';
        let response = await fetch(redUrl, {
        method: 'POST',
        body: str,
        headers: {
        'Content-Type': 'application/json'
        }})
        });
        $("#getPass").on("click",async function(){
        var x = document.getElementsByClassName("tag");
        const apartId = x[1].textContent
        console.log(apartId)
        var y = document.getElementById("inputP");
        y.style.display = 'block';
        var z = document.getElementById("changePass");
        z.style.display = 'block';
        const manageBalanceData = {
        data :
        {phone : '+79870389135',
        service : 'amocrm',
        method : 'getAdminPasscode',
        args: [apartId]}
        }
        const str = JSON.stringify(manageBalanceData);
        let redUrl = 'https://9a10461e2605.ngrok.io/test-shveitsar/us-central1/v1dev';
        let response = await fetch(redUrl, {
        method: 'POST',
        body: str,
        headers: {
        'Content-Type': 'application/json'
        }})
        let xd = await response.json()
        var text = $('#idInput').val();
        console.log(xd)
        $('#amoText').text(xd.result);
        });
        
        $("#changePass").on("click",async function(){
        var x = document.getElementsByClassName("tag");
        const apartId = x[1].textContent
        const manageBalanceData = {
        data :
        {phone : '+79870389135',
        service : 'amocrm',
        method : 'changeAdminPasscode',
        args: [apartId, $('#idInput').val()]}
        }
        const str = JSON.stringify(manageBalanceData);
        let redUrl = 'https://9a10461e2605.ngrok.io/test-shveitsar/us-central1/v1dev';
        let response = await fetch(redUrl, {
        method: 'POST',
        body: str,
        headers: {
        'Content-Type': 'application/json'
        }})
        let xd = await response.json()
        //var text = $('#idInput').val();
        console.log(xd)
        $('#amoText').text(xd.result);
        });
    };

    return this;
};

var PageWidget = function (widgetCode) {
//return function (widgetCode, settings) {
        this.triggerId = widgetCode + '-mainMenuTrigger';
        this.entityId = widgetCode + 'Widget';
        this.buttonTitle = 'Швейцар интеграция';
        this.pageTitle = 'Швейцар Онлайн';
        this.iconClass = "icon-settings";
        this.actionsBindSuccess = false;
        this.getPageHTML = function () {
            return "<div class=\"list  list-contacts list-no-sidebar\" id=\"list_page_holder\">\n" +
                "    <div class=\"list__body clearfix\">\n" +
                "        <div id=\"list__body-right\" class=\"list__body-right list__body-right_has-footer\">\n" +
                "            <div class=\"list__body-right__top\">\n" +
                "                <div class=\"list__top__preset\">\n" +
                "                    <span class=\"list-top-nav__text-button list-top-nav__text-button_submenu js-list-top-nav__text-button_submenu list-top-nav__text-button_active h-text-overflow\"\n" +
                "                          data-entity=\"" + this.entityId +"\">" + this.pageTitle + "</span>\n" +
                "                </div>\n" +
                "                <div class=\"list__top__actions\">\n" +
                "                    <div class=\"list-top-nav__icon-button list-top-nav__icon-button_dark list-top-nav__icon-button_context\">\n" +
                "                        <div class=\"button-input-wrapper button-input-more content__top__action__btn-more\">\n" +
                "                            <button type=\"button\" class=\"button-input button-input-with-menu  \" tabindex=\"\" id=\"\" title=\"Еще\">\n" +
                "                                <span class=\"button-input-inner button-input-more-inner\">\n" +
                "                                    <svg class=\"svg-icon svg-controls--button-more-dims\"><use\n" +
                "                                            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n" +
                "                                            xlink:href=\"#controls--button-more\"></use></svg>\n" +
                "                                </span>\n" +
                "                            </button>\n" +
                "                            <ul class=\"button-input__context-menu \">\n" +
                "                            </ul>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <a href=\"#\" data-href=\"#\" class=\"button-input  button-input_blue js-navigate-link\">\n" +
                "                        <svg class=\"svg-icon svg-controls--button-add-dims\">\n" +
                "                            <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#controls--button-add\"></use>\n" +
                "                        </svg>\n" +
                "                        <span class=\"button-input-inner__text button-input-inner__text_short\">Кнопка</span>\n" +
                "                        <span class=\"button-input-inner__text\">Не нажимать</span>\n" +
                "                    </a>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"list__body__holder list__body__holder-table js-hs-wrapper hs-wrapper_hide-boundary hs-wrapper\" id=\"list_holder\">\n" +
                "                <div class=\"custom-page-content\">\n" +
                "                </div>\n" +
             "   <div class=\"safety_settings__section_new\" style=\"margin: 10px 25px\">\n" +
   " <form name=\"TEST\">\n" +
       " <button id=\"createThing\" class=\"button-input\">\n" +
          "  <span class=\"button-input-inner\">\n" +
              "  <span class=\"button-input-inner__text\">\n" +
                "    Передать данные сервису Швейцар Онлайн\n" +
              "  </span>\n" +
          "  </span>\n" +
       " </button>\n" +
       " <table class=\"content__account__settings\">\n" +
           " <tbody>\n" +
               " <tr>\n" +
                  "  <td class=\"content__account__settings__title\">\n" +
                     "   Id агентства\n" +
                    "</td>\n" +
                  "  <td class=\"content__account__settings__field\">\n" +
                      "  <input\n" +
                        "    class=\"text-input\"\n" +
                       "     name=\"agencyId\"\n" +
                    "        placeholder=\"+799...\"\n" +
                     "   />\n" +
                   " </td>\n" +
               " </tr>\n" +
               " <tr>\n" +
                    "<td class=\"content__account__settings__title\">\n" +
                    "    Секретный ключ\n" +
                   " </td>\n" +
                   " <td class=\"content__account__settings__field\">\n" +
                    "    <input\n" +
                     "       class=\"text-input\"\n" +
                    "        name=\"secretKey\"\n" +
                    "        placeholder=\"qwerty...\"\n" +
                    "    />\n" +
                 "   </td>\n" +
               " </tr>\n" +
               " <tr>\n" +
                    "<td class=\"content__account__settings__title\">\n" +
                    "    ID интеграции\n" +
                   " </td>\n" +
                   " <td class=\"content__account__settings__field\">\n" +
                    "    <input\n" +
                     "       class=\"text-input\"\n" +
                    "        name=\"IntegrationId\"\n" +
                    "        placeholder=\"qwerty...\"\n" +
                    "    />\n" +
                 "   </td>\n" +
               " </tr>\n" +
               " <tr>\n" +
                    "<td class=\"content__account__settings__title\">\n" +
                    "    Код авторизации\n" +
                   " </td>\n" +
                   " <td class=\"content__account__settings__field\">\n" +
                    "    <input\n" +
                     "       class=\"text-input\"\n" +
                    "        name=\"authCode\"\n" +
                    "        placeholder=\"def5...\"\n" +
                    "    />\n" +
                 "   </td>\n" +
               " </tr>\n" +
               " <tr>\n" +
                 "   <td class=\"content__account__settings__title\">Amocrm ID</td>\n" +
                   " <td class=\"content__account__settings__field\">\n" +
                      "  <input\n" +
                        "    class=\"text-input\"\n" +
                          "  name=\"amoId\"\n" +
                       "     placeholder=\"user.amocrm.ru\"\n" +
                     "   />\n" +
                  "  </td>\n" +
              "  </tr>\n" +
           " </tbody>\n" +
       " </table>\n" +
   " </form>\n" +
"</div> \n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>\n"+
                "<script> const qwe = document.TEST.agencyId.value; createThing.onclick = async function() { const _qwe = document.TEST.agencyId.value; const _auth = document.TEST.authCode.value;const _secretKey = document.TEST.secretKey.value; const _idI = document.TEST.IntegrationId.value; const _amoId = document.TEST.amoId.value; const _data = {  phoneNumber: _qwe, auth: _auth, amoId : _amoId, secretKey : _secretKey, idI :_idI }; const str = JSON.stringify(_data); let response = await fetch(\"https://amohook.shveitsar.workers.dev\", { method: 'POST', body: str, mode : 'no-cors', headers: {'Content-Type': 'application/json'}});} </script>";

        };
       // "<script> const qwe = document.TEST.agencyId.value; createThing.onclick = async function() { const _qwe = document.TEST.agencyId.value; const _auth = document.TEST.authCode.value; const _amoId = document.TEST.amoId.value; const _data = {  phoneNumber: _qwe, auth: _auth, amoId : _amoId }; const str = JSON.stringify(_data); let response = await fetch(\"https://033d36a73c17.ngrok.io/test-shveitsar/us-central1/v1hooks-amoWebhook\", { method: 'POST', body: str, mode : 'no-cors', headers: {'Content-Type': 'application/json'}});} </script>";

        this.deselectAllButtons = function () {
            $('.nav__menu__item-selected').removeClass('nav__menu__item-selected');
        };
        this.selectMainMenuButton = function () {
            $('.nav__menu__item--custom[data-entity="' + this.entityId + '"]').addClass('nav__menu__item-selected');
        };
        this.showPage = function () {
            this.deselectAllButtons();
            this.selectMainMenuButton();
            let pageHTML = this.getPageHTML();
            $('#page_holder').html(pageHTML);
            return true;
        };

        this.addButtonToMainMenu = function (afterButtonCode) {
            if (!afterButtonCode) {
                afterButtonCode = 'leads'; //['leads', 'todo', 'catalogs', 'mail', 'stats', 'settings']
            }
            let menuItemHTML = "<div class=\"nav__menu__item--custom \" data-entity=\"" + this.entityId+ "\">\n" +
                "    <span class=\"nav__menu__item__link--custom\" id=\"" + this.triggerId + "\">\n" +
                "        <div class=\"nav__menu__item__icon " + this.iconClass + "\">\n" +
                "            <span class=\"js-notifications_counter nav__notifications__counter\" style=\"display: none\"></span>\n" +
                "        </div>\n" +
                "        <div class=\"nav__menu__item__title\">" + this.buttonTitle + "</div>\n" +
                "    </span>\n" +
                "</div>";

            $('#nav_menu [data-entity='+afterButtonCode+']').after(menuItemHTML);
        };

        this.isInitialized = function () {
            return $('.nav__menu__item--custom[data-entity="' + this.entityId + '"]').length > 0;
        };

        this.initWidget = function (afterButtonCode) {
            if ( !this.isInitialized() ) {
                this.addButtonToMainMenu(afterButtonCode);
            }
        };

        this.checkGoAwayAndDeselectButton = function (event) {
            let $clickedButton = $(event.target.parentNode);
            let isGoAway = $clickedButton.data('entity') !== this.entityId;
            if (isGoAway) {
                $('#nav_menu [data-entity='+ this.entityId +']').removeClass('nav__menu__item-selected');
            }
        };

        this.bindActions = function () {
            if (this.actionsBindSuccess) {
                return;
            }

            $('#'+this.triggerId).on('click', this.showPage.bind(this));
            $('.nav__menu__item').on('click', this.checkGoAwayAndDeselectButton.bind(this));
            this.actionsBindSuccess = true;
        };

        return this;
    };






  var CustomWidget = function () {
    var self = this;
    let widget = this;
    let settings = this.get_settings();
    let widgetCode = 'MyWidget';
    

this.includeCSS = function () {
  $('head').append('<style>\n' +
      '.custom-tab-content { padding: 0 30px; }\n' +
      '.custom-page-content { padding: 0 30px; }\n' +
      '.nav__menu__item--custom {margin: 16px 0 0; position: relative; cursor: pointer; line-height: 70px; text-align: center;}\n' +
      '.nav__menu__item__link--custom {text-decoration: none;color: #9da8ae;font-size: 0;outline: none;}\n' +
      '</style>');
};
this.addButtonToListContextMenu = function () {
  let triggerId = widgetCode + '-contextTrigger';
  let menuItemName = 'Тестовый виджет';

  let alreadyAdded = $('#'+triggerId).length > 0;
  if (alreadyAdded) {
      return;
  }

  let menuItemHTML = "<li class=\"button-input__context-menu__item  element__\" id=\"" + triggerId +"\">" +
      "    <div class=\"button-input__context-menu__item__inner\">" +
      "        <div class='icon'></div>" +
      "        <span class=\"button-input__context-menu__item__text\">" + menuItemName + "</span>" +
      "    </div>" +
      "</li>";

  $('.context-menu-pipeline').append(menuItemHTML);
};
    this.putWidgetToDOM = function () {
      let widgetHTML ='<div class="widget">Виджет Швейцар Онлайн</div>';

      this.render_template({
          caption: {
              class_name: widgetCode + 'Widget',
          },
          body: widgetHTML,
          render: ''
      });

      return true;
  };
  this.initWidget = function () {
    this.includeCSS();

    this.addButtonToListContextMenu();

    this.tabWidget = new TabWidget(widgetCode);
    this.tabWidget.initWidget();

    this.pageWidget = new PageWidget(widgetCode);
    this.pageWidget.initWidget('leads');
    return true;
};

this.showWidgetContext = function () {
  console.log('showWidgetContext');
  return true;
};

this.bindActions = function () {
  $('#'+widgetCode+'-contextTrigger').on('click', this.showWidgetContext.bind(this));

  this.tabWidget.bindActions();
 this.pageWidget.bindActions();
  return true;
};

this.showWidgetForSelectedLeads = function (leads) {
  console.log('showWidgetForSelectedLeads', leads);
  return true;
};

this.destroyWidget = function () {
  return true;
};

    this.callbacks = {
      render: this.putWidgetToDOM.bind(this),
      init:this.initWidget.bind(this),
      
      bind_actions: this.bindActions.bind(this),
      settings: function () {
        return true;
      },
      onSave: function () {
        alert('click');
        return true;
      },
      destroy: this.destroyWidget.bind(this),
      contacts: {
        selected: function () {
          console.log('contacts');
        }
      },
      leads: {
        selected: (function () {
          let selectedLeads = this.list_selected().selected;
          this.showWidgetForSelectedLeads(selectedLeads);
      }).bind(this)
      },
      tasks: {
        selected: function () {
          console.log('tasks');
        }
      },
      

      onSalesbotDesignerSave: function (handler_code, params) {
        var salesbot_source = {
            question: [],
            require: []
          },
          button_caption = params.button_caption || "",
          button_title = params.button_title || "",
          text = params.text || "",
          number = params.number || 0,
          handler_template = {
            handler: "show",
            params: {
              type: "buttons",
              value: text + ' ' + number,
              buttons: [
                button_title + ' ' + button_caption,
              ]
            }
          };

        console.log(params);

        salesbot_source.question.push(handler_template);

        return JSON.stringify([salesbot_source]);
      },
    };
    return this;
  };

