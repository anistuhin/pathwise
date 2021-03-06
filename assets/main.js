(function($) {
    var a1, a2, a3, b1, b2, b3, c1, c2, c3;
    a1 = b2 = c3 = [3, 6, 9, 13, 16, 21, 22, 23, 28, 30];
    a2 = b1 = c2 = [2, 4, 6, 9, 12, 20, 21, 22, 29];
    a3 = b3 = c1 = [3, 6, 9, 22, 23, 28, 30];
    var commentPinCount = 1;
    var redactPinCount = 1;
    var pagesOffsetTop = $('#editor-body').offset().top;
    var pagesOffsetLeft = $('#editor-body').offset().left;
    var scrolledDistance = 0;
    var emotionsList = ['Default', 'Happy', 'Questioning', 'Confused', 'Sad', 'Surprised', 'Attentive'];
    var pins = [];
    var redactors = [];
    var meta = {};
    // var quickComments = [{
    //         'group': 'one',
    //         'show_items': 1,
    //         'comments': [{
    //                 'text': `I'm, confused, can you explain what _______ means?`,
    //                 'emotion': 'Questioning'
    //             },
    //             {
    //                 'text': `I remember from class. A _______ is like a _____.`,
    //                 'emotion': 'Default'
    //             }
    //         ]
    //     },
    //     {
    //         'group': 'two',
    //         'show_items': 1,
    //         'comments': [{
    //                 'text': `That sounds incredible to me. Do you think _______ is always true?`,
    //                 'emotion': 'Questioning'
    //             },
    //             {
    //                 'text': `So, in other words, _______.`,
    //                 'emotion': 'Default'
    //             }
    //         ]
    //     },
    //     {
    //         'group': 'three',
    //         'show_items': 1,
    //         'comments': [{
    //                 'text': `That's interesting, I think that _______ will happen next!`,
    //                 'emotion': 'Attentive'
    //             },
    //             {
    //                 'text': `That is so [shocking] to me.`,
    //                 'emotion': 'Surprised'
    //             }
    //         ]
    //     }
    // ];
    var quickComments = [{
            'group': 'student-summary',
            'show_items': 1,
            'comments': [{
                    'text': `I'm a little confused, can you explain that to me?`,
                    'emotion': 'Confused'
                },
                {
                    'text': `I THINK I understood, but could you summarize what that means for me?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `How would you explain this to someone else in class?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `So in other words, ______ _______`,
                    'emotion': 'Happy'
                },
                {
                    'text': `I can think of a couple more examples, such as ______ and _____`,
                    'emotion': 'Happy'
                },
                {
                    'text': `This reminds me of that class activity we did, where we _______`,
                    'emotion': 'Surprised'
                }
            ]
        },
        {
            'group': 'expand-predict',
            'show_items': 1,
            'comments': [{
                    'text': `Can you think of a couple of other examples of this?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `Wow! That sounds incredible, do you think its always true?`,
                    'emotion': 'Surprised'
                },
                {
                    'text': `That's interesting, what do you think would happen next?`,
                    'emotion': 'Surprised'
                },
                {
                    'text': `Not only that, but I also know that _________`,
                    'emotion': 'Default'
                },
                {
                    'text': `Another example of this would be _______`,
                    'emotion': 'Attentive'
                },
                {
                    'text': `I have also learned that ______`,
                    'emotion': 'Happy'
                }
            ]
        },
        {
            'group': 'vocab-support',
            'show_items': 1,
            'comments': [{
                    'text': `Hoooold on. Can you tell me what  ______ means?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `Huh? What do you think they mean when they say ____?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `I've heard ____ before, I think it means ______.`,
                    'emotion': 'Happy'
                },
                {
                    'text': `I think when they're saying ____ it means ______.`,
                    'emotion': 'Happy'
                }
            ]
        },
        {
            'group': 'personal-connection',
            'show_items': 1,
            'comments': [{
                    'text': `Is there something in your home that works this way?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `How do you think this might inform someone doing sports?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `Knowing this, would you change how you go about your day?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `Do you think this is something robots like me should know?`,
                    'emotion': 'Happy'
                }
            ]
        },
        {
            'group': 'recalling-past-events',
            'show_items': 1,
            'comments': [{
                    'text': `I remember there was something like that in class - do you remember what it was?`,
                    'emotion': 'Questioning'
                },
                {
                    'text': `Do you remember something we did in class like this?`,
                    'emotion': 'Surprised'
                },
                {
                    'text': `Is this something you'd enjoy doing in class? I would!`,
                    'emotion': 'Happy'
                },
                {
                    'text': `Hmmm. Do you remember reading something about this in class?`,
                    'emotion': 'Questioning'
                }
            ]
        },
        {
            'group': 'emotional-connection',
            'show_items': 1,
            'comments': [{
                    'text': `That's so surpising to me!`,
                    'emotion': 'Surprised'
                },
                {
                    'text': `I think this is probably the key bit for us to understand!`,
                    'emotion': 'Attentive'
                },
                {
                    'text': `This would be a lot of fun to do in class!`,
                    'emotion': 'Happy'
                },
                {
                    'text': `Can you imagine how that feels?`,
                    'emotion': 'Confused'
                },
                {
                    'text': `Woah! That's so cool`,
                    'emotion': 'Surprised'
                }
            ]
        }
    ];

    $(document).ready(function() {
        preInit();
        init();
        $(document).on('click', '.comments-list-toggle', function() {
            $('main').attr('data-comments-toggle', '0');
            $('#comments-column-toggler').attr('data-toggler', '0');
        });
        $(document).on('click', '.comments-template-toggle', function() {
            $('main').attr('data-comments-toggle', '1');
            $('#comments-column-toggler').attr('data-toggler', '1');
        });
        $(document).on('click', '#audiences>p', function() {
            if ($(this).parent().attr('data-toggler') == '0') {
                $(this).parent().attr('data-toggler', '1');
            }
        });
        $(document).on('click', '.audience-class li', function() {
            $('.audience-class li').removeClass('selected');
            $(this).addClass('selected');
            var classID = $(this).attr('data-id').trim();
            var groupID = $(this).parents('#audiences').attr('data-group').trim();
            $(this).parents('#audiences').attr('data-class', classID);
            updateStudents(classID, groupID);
        });
        $(document).on('click', '.audience-groups li', function() {
            $('#audiences>p>span').text($(this).text().trim());
            $('.audience-groups li').removeClass('active');
            $(this).addClass('active');
            var classID = $(this).parents('#audiences').attr('data-class').trim();
            var groupID = $(this).attr('data-id').trim();
            $(this).parents('#audiences').attr('data-group', groupID);
            updateStudents(classID, groupID);
        });
        $(document).on('click', '.audience-students li', function() {
            $(this).toggleClass('selected');

        });
        $(document).on('click', function(e) {
            var container = $("#audiences");
            if (!$(e.target).closest(container).length) {
                $('#audiences').attr('data-toggler', '0');
            }
        });
        $(document).on('click', '.add-comment-btn', function() {
            if ($('main').attr('data-comments') == '0') {
                $('main').attr('data-comments', '1');
            } else {
                $('main').attr('data-comments', 0);
            }
        });
        $(document).on('click', '#selected-emotion>p', function() {
            if ($(this).parent().attr('data-toggler') == '0') {
                $(this).parent().attr('data-toggler', '1');
            } else {
                $(this).parent().attr('data-toggler', '0');
            }
        });
        $(document).on('click', '#selected-emotion > ul li', function() {
            var $this = $(this);
            var emotionId = getEmotionId($(this).text().trim());
            $('#selected-emotion > ul li').removeClass('active');
            $this.addClass('active');
            $this.parents('#selected-emotion').children('p').text($(this).text().trim());
            $this.parents('#selected-emotion').attr('data-toggler', '0');
            $this.parents('#robot-emotions').attr('class', 'blink');
            setTimeout(function() {
                $this.parents('#robot-emotions').attr('class', $this.text().trim().toLowerCase());
            }, 150);
            if ($('.cp.focused').length == 1) {
                $('.cp#' + $('.cp.focused').attr('id')).attr('data-emotion', emotionId);
                $('#comments-list [data-id="' + $('.cp.focused').attr('id') + '"]').attr('data-emotion', emotionId);
                managePin($('.cp.focused').attr('id'), 'updateEmotion', emotionId);
            }
        });
        $('#editor').scroll(function() {
            scrolledDistance = parseInt($("#editor").scrollTop());
        });
        $(document).on('dragover', '#pages', function(e) {
            e.preventDefault();
        });
        $(document).on('dragstart', '.cn, .ce, .cp, .re, .rp', function(e) {
            if ($(this).hasClass('cp') || $(this).hasClass('rp')) {
                var srcTop = (e.originalEvent.clientY - pagesOffsetTop) + scrolledDistance;
                var srcLeft = e.originalEvent.clientX - pagesOffsetLeft;
                var diffY = srcTop - parseInt($(this).css('top'), 10);
                var diffX = srcLeft - parseInt($(this).css('left'), 10);
                e.originalEvent.dataTransfer.setData("text/plain", diffY + '-' + diffX);
            }
            e.originalEvent.dataTransfer.setData("text/html", e.target.outerHTML);
        });
        $(document).on('drop', '#pages', function(e) {
            e.preventDefault();
            //init();
            var elem = $.parseHTML(e.originalEvent.dataTransfer.getData("text/html"))[0];
            var posTop = (e.originalEvent.clientY - pagesOffsetTop) + scrolledDistance;
            var posLeft = e.originalEvent.clientX - pagesOffsetLeft;
            var cText = $(elem).text().trim();
            var cEmotion = $(elem).attr('data-emotion');
            var editorWidth = $('#editor').width();
            var diffY = 0;
            var diffX = 0;
            if ($(elem).hasClass('cn')) {
                cText = '';
            }
            if ($(elem).hasClass('cp') || $(elem).hasClass('rp')) {
                diffY = e.originalEvent.dataTransfer.getData("text/plain").split('-')[0];
                diffX = e.originalEvent.dataTransfer.getData("text/plain").split('-')[1];
            }
            if ($(elem).hasClass('cp')) {
                var cID = $(elem).attr('id').trim();
                $(document).find('.cp#' + cID).css('top', posTop - diffY);
                $(document).find('.cp#' + cID).css('left', posLeft - diffX);
                $(document).find('#comments-list>ul [data-id="' + cID + '"]').attr('data-top', posTop - diffY);
                $(document).find('#comments-list>ul [data-id="' + cID + '"]').attr('data-left', posLeft - diffX);
                if ((posLeft + 160) >= editorWidth) {
                    $(document).find('.cp#' + cID).addClass('edged');
                } else {
                    $(document).find('.cp#' + cID).removeClass('edged');
                }
                $(document).find('.cp#' + cID + '>p').click();
                sortComments(cID);
            }
            if ($(elem).hasClass('cn') || $(elem).hasClass('ce')) {
                $('#pages').append('<div data-emotion="' + cEmotion + '" data-comment="' + cText + '" id="c' + commentPinCount + '" class="cp" draggable="true" style="top:' + posTop + 'px; left:' + posLeft + 'px;"><p>' + commentPinCount + '</p><ul><li class="delete-pin">Delete</li><li class="duplicate-pin">Duplicate</li><li class="new-pin">Create New</li></ul></div>');
                $(document).find('.cp#c' + commentPinCount + '>p').click();
                $('#comments-list>ul').append('<li data-top="' + posTop + '" data-left="' + posLeft + '" data-comment="' + cText + '" data-emotion="' + cEmotion + '" data-id="c' + commentPinCount + '"><span class="comment-id">' + commentPinCount + '</span><p>' + cText + '</p></li>');
                sortComments('c' + commentPinCount);
                commentPinCount++;
                if ($(elem).hasClass('cn')) {
                    $('#comment-input textarea').attr('placeholder', '[Create your own comment]');
                }
                if ($(elem).hasClass('ce')) {
                    var groupName = $(elem).attr('data-parent').trim();
                    var currentCommentId = $(elem).attr('data-id').trim();
                    var latestCommentId = $('#comments-template [data-group="' + groupName + '"]').attr('data-latest').trim();
                    $(document).find('#comments-template [data-id="' + currentCommentId + '"][data-parent="' + groupName + '"]').remove();
                    getNextComment(groupName, latestCommentId);
                }
                if ((posLeft + 160) >= editorWidth) {
                    $(document).find('.cp#c' + (commentPinCount - 1)).addClass('edged');
                } else {
                    $(document).find('.cp#c' + (commentPinCount - 1)).removeClass('edged');
                }
            }
            if ($(elem).hasClass('re')) {
                $('#pages').append('<div id="r' + redactPinCount + '" class="rp" draggable="true" style="top:' + posTop + 'px; left:' + posLeft + 'px;"><ul><li class="delete-redactor">Delete</li><li class="duplicate-redactor">Duplicate</li></ul></div>');
                redactPinCount++;
            }
            if ($(elem).hasClass('rp')) {
                var rID = $(elem).attr('id').trim();
                $(document).find('.rp#' + rID).css('top', posTop - diffY);
                $(document).find('.rp#' + rID).css('left', posLeft - diffX);
            }
        });
        $(document).on('drop', '#comment-input textarea', function(e) {
            e.preventDefault();
        });
        $(document).on('click', '.cp>p', function() {
            var $this = $(this).parent();
            $('.cp').removeClass('focused');
            $($this).addClass('focused');
            $(document).find('#selected-emotion > ul li[data-id="' + $($this).attr('data-emotion').trim() + '"]').click();
            $('#comment-input textarea').val($($this).attr('data-comment').trim());
            $('#comment-input textarea').focus();
        });
        $(document).on('click', '#comments-list ul li', function() {
            $(document).find('.cp#' + $(this).attr('data-id') + '>p').click();
            $('#editor').animate({ scrollTop: $('#editor').offset().top + parseInt($('.cp#' + $(this).attr('data-id')).css('top'), 10) - 200 }); // 200 = 116(height from body top to pages/editor top is 116) + 84(scroll to 84px above the pin)
        });
        $(document).on('input', '#comment-input textarea', function() {
            if ($('.cp.focused').length == 1) {
                $('.cp#' + $('.cp.focused').attr('id')).attr('data-comment', $(this).val());
                $('#comments-list [data-id="' + $('.cp.focused').attr('id') + '"]').attr('data-comment', $(this).val());
                $('#comments-list [data-id="' + $('.cp.focused').attr('id') + '"] > p').text($(this).val());
                managePin($('.cp.focused').attr('id'), 'updateComment', $(this).val());
            }
        });
        $(document).on('click', '.delete-pin', function() {
            managePin($(this).parents('.cp').attr('id'), 'delete');
            $('#comments-list li[data-id="' + $(this).parents('.cp').attr('id') + '"]').remove();
            $(this).parents('.cp').remove();
        });
        $(document).on('click', '.duplicate-pin, .new-pin', function() {
            var target = $(document).find('.cp#' + $(this).parents('.cp').attr('id'));
            var posTop = parseInt(target.css('top'), 10);
            var posLeft = parseInt(target.css('left'), 10);
            var cText = target.attr('data-comment');
            var cEmotion = target.attr('data-emotion');
            var editorHeieght = $('#editor').height();
            if ($(this).hasClass('new-pin')) {
                cText = '';
                cEmotion = 0;
            }
            if ((posTop + 50) >= editorHeieght) {
                posTop -= 50;
            } else {
                posTop += 50;
            }
            $('#pages').append('<div data-emotion="' + cEmotion + '" data-comment="' + cText + '" id="c' + commentPinCount + '" class="cp" draggable="true" style="top:' + posTop + 'px; left:' + posLeft + 'px;"><p>' + commentPinCount + '</p><ul><li class="delete-pin">Delete</li><li class="duplicate-pin">Duplicate</li><li class="new-pin">Create New</li></ul></div>');
            $(document).find('.cp#c' + commentPinCount + '>p').click();
            $('#comments-list>ul').append('<li data-top="' + posTop + '" data-left="' + posLeft + '" data-comment="' + cText + '" data-emotion="' + cEmotion + '" data-id="c' + commentPinCount + '"><span class="comment-id">' + commentPinCount + '</span><p>' + cText + '</p></li>');
            sortComments('c' + commentPinCount);
            commentPinCount++;
        });
        $(document).on('click', '.delete-redactor', function() {
            $(this).parents('.rp').remove();
        });
        $(document).on('click', '.duplicate-redactor', function() {
            var target = $(document).find('.rp#' + $(this).parents('.rp').attr('id'));
            var posTop = parseInt(target.css('top'), 10);
            var posLeft = parseInt(target.css('left'), 10);
            var editorHeieght = $('#editor').height();
            if ((posTop + 110) >= editorHeieght) {
                posTop -= 110;
            } else {
                posTop += 110;
            }
            $('#pages').append('<div id="r' + redactPinCount + '" class="rp" draggable="true" style="top:' + posTop + 'px; left:' + posLeft + 'px;"><ul><li class="delete-redactor">Delete</li><li class="duplicate-redactor">Duplicate</li></ul></div>');
            redactPinCount++;
        });
        $(document).on('click', '#save-btn', function() {
            // var url = '/validate/',
            //     data = '';
            save();
            submitToGoogleForm(JSON.stringify(pins), JSON.stringify(redactors), JSON.stringify(meta));
            // data.pins = JSON.stringify(pins);
            // data.redactors = JSON.stringify(redactors);
            // data.meta = JSON.stringify(meta);
            // $.post(url, data, function(data, success) {
            //     if (success == 'success') {
            //         // var response = JSON.parse(data);
            //         // console.log(Number(response.status));
            //         // console.log(pins);
            //         // console.log(redactors);
            //         // console.log(meta);
            //         console.log(data);
            //     } else {
            //         console.log('Something went wrong!');
            //     }
            // });
        });
    });

    function submitToGoogleForm(pins, redactors, meta) {
        var formid = "e/1FAIpQLScKuIrXyra1lh8Xxt74vbJ9cRr2WfERS8Ho6aQdtSwyA80tYg";
        var data = {
            "entry.2032535083": pins,
            "entry.836476239": redactors,
            "entry.1793196186": meta
        };
        var params = [];
        for (key in data) {
            params.push(key + "=" + encodeURIComponent(data[key]));
        }
        // Submit the form using an image to avoid CORS warnings.
        (new Image).src = "https://docs.google.com/forms/d/" + formid +
            "/formResponse?" + params.join("&");
    }

    function preInit() {
        var elem = '';
        $.each(emotionsList, function(i, v) {
            $('#selected-emotion>ul').append('<li' + (i == 0 ? ' class="active"' : '') + ' data-id="' + i + '">' + v + '</li>');
        });
        $.each(quickComments, function(i, v) {
            elem += '<ul data-group="' + v.group + '" data-latest="0">';
            var counter = 0;
            $.each(v.comments, function(ci, cv) {
                if (counter < v.show_items) {
                    elem += '<li class="ce" data-id="' + ci + '" data-parent="' + v.group + '" draggable="true" data-emotion="' + getEmotionId(cv.emotion) + '">' + cv.text + '</li>';
                    counter++;
                } else {
                    return false;
                }
            });
            elem += '</ul>';
        });
        if (quickComments.length > 0 && elem !== '') {
            $('#comments-template').append(elem);
        }
    }

    function init() {
        $('.audience-groups li:first-child').click();
        $('.audience-class > ul li:first-child').click();
        $('#audiences').attr('data-toggler', '0');
        $(document).find('#selected-emotion > ul li:first-child').click();
        $('#selected-emotion').attr('data-toggler', '0');
        $('#comment-input textarea').val('');
    }

    function managePin(id, action, value) {
        $.each(pins, function(i, v) {
            if (v.id == id) {
                if (action == 'updateComment') {
                    v.text = value;
                }
                if (action == 'updateEmotion') {
                    v.emotion = value;
                }
                if (action == 'delete') {
                    pins.splice(i, 1);
                }
                return false;
            }
        });
    }

    function getEmotionId(emotion) {
        var id = 0;
        $.each(emotionsList, function(i, v) {
            if (emotion == v) {
                id = i;
            }
        });
        return id;
    }

    function getNextComment(groupName, latestCommentId) {
        $.each(quickComments, function(i, v) {
            if (v.group.trim() == groupName.trim()) {
                latestCommentId++;
                if (latestCommentId >= v.comments.length) {
                    latestCommentId = 0;
                }
                var cv = v.comments[latestCommentId];
                $('#comments-template [data-group="' + groupName + '"]').append('<li class="ce" data-id="' + latestCommentId + '" data-parent="' + v.group + '" draggable="true" data-emotion="' + getEmotionId(cv.emotion) + '">' + cv.text + '</li>');
                $('#comments-template [data-group="' + groupName + '"]').attr('data-latest', latestCommentId);
            }
        });
    }

    function sortComments(id) {
        var length = $('#comments-list>ul>li').length;
        if (length > 1) {
            var target = $('#comments-list>ul>li[data-id="' + id + '"]').detach();
            if (length == 2) {
                var firstChild = $('#comments-list>ul>li:first-child');
                if (parseInt($(firstChild).attr('data-top')) > parseInt($(target).attr('data-top'))) {
                    $(firstChild).before(target);
                } else {
                    $(firstChild).after(target);
                }
            } else {
                if (parseInt($(target).attr('data-top')) > parseInt($('#comments-list>ul>li:last-child').attr('data-top'))) {
                    $('#comments-list>ul>li:last-child').after(target);
                } else {
                    for (var i = 1; i < length; i++) {
                        if (parseInt($(target).attr('data-top')) < parseInt($('#comments-list>ul>li:nth-child(' + i + ')').attr('data-top'))) {
                            $('#comments-list>ul>li:nth-child(' + i + ')').before(target);
                            break;
                        } else if ((parseInt($(target).attr('data-top')) > parseInt($('#comments-list>ul>li:nth-child(' + i + ')').attr('data-top'))) && (parseInt($(target).attr('data-top')) < parseInt($('#comments-list>ul>li:nth-child(' + (i + 1) + ')').attr('data-top')))) {
                            $('#comments-list>ul>li:nth-child(' + i + ')').after(target);
                            break;
                        } else {
                            i++;
                        }
                    }
                }
            }
        }
    }

    function updateStudents(classID, groupID) {
        $('.audience-students li').removeClass('selected');
        if (groupID != 4) {
            var studentsList = classID + groupID;
            if (studentsList == 'a0' || studentsList == 'b0' || studentsList == 'c0') {
                $('.audience-students li').addClass('selected');
            } else {
                $(eval(studentsList)).each(function(i, v) {
                    $('.audience-students li:nth-child(' + v + ')').addClass('selected');
                });
            }
        }
    }

    function save() {
        pins = [];
        redactors = [];
        $.each($('#comments-list > ul > li'), function() {
            var comment = {};
            comment.text = $(this).attr('data-comment');
            comment.emotion = $(this).attr('data-emotion');
            comment.top = parseInt($(this).attr('data-top'));
            comment.left = parseInt($(this).attr('data-left'));
            comment.id = $(this).attr('data-id');
            pins.push(comment);
        });
        $.each($('#editor .rp'), function() {
            var redactor = {};
            redactor.id = $(this).attr('id');
            redactor.top = parseInt($(this).css('top'), 10);
            redactor.left = parseInt($(this).css('left'), 10);
            redactors.push(redactor);
        });
        meta.pageWidth = $(window).width();
        meta.pageHeight = $(window).height();
        meta.editorWidth = $('#editor-body').width();
        meta.editorHeight = $('#editor-body').height();
        meta.title = $('#assignment-title').text().trim();
        meta.sampleNo = parseInt($('body').attr('data-version'));
    }
})(window.jQuery);