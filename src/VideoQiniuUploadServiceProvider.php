<?php

namespace Zero\VideoQiniuUpload;

use Encore\Admin\Admin;
use Illuminate\Support\ServiceProvider;

class VideoQiniuUploadServiceProvider extends ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function boot(VideoQiniuUpload $extension)
    {
        if (! VideoQiniuUpload::boot()) {
            return ;
        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes(
                [$assets => public_path('vendor/laravel-admin-ext/video-qiniu-upload')],
                'video-qiniu-upload'
            );
        }

        if ($views = $extension->views()) {
            $this->loadViewsFrom($views, 'video-qiniu-upload');
        }

        Admin::booting(function (){
            Admin::js('vendor/laravel-admin-ext/video-qiniu-upload/js/bootstrap.file-input.js');
            Admin::js('vendor/laravel-admin-ext/video-qiniu-upload/js/qiniu.min.js');
        });

    }

}
