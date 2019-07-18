<?php

namespace Zero\VideoQiniuUpload;

use Encore\Admin\Form\Field;

class VideoQiniuUploadField extends Field
{

    public $view = 'video-qiniu-upload::video-qiniu-upload';

    public function render()
    {
        $name = $this->formatName($this->column);

        $this->script = <<<SRC

        $('#{$name}-file').change(function(){
             uploadWithQiNiuSDK(this,'#{$name}-savedpath');
        });
SRC;

        return parent::render();
    }
}
