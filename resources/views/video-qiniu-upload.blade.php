<div class="form-group {!! !$errors->has($label) ?: 'has-error' !!}" >

    <label for="{{$id}}" class="col-sm-2 control-label">{{$label}}</label>
    <div class="col-sm-6">
        @include('admin::form.error')

        <div class="controls" id="aetherupload-wrapper-{{$name}}">
            <input type="file" id="{{$name}}-file" data-filename-placement="inside" class="file-inputs"/>
            <br>

            @if($value)
                <video id="video-preview" src="//image.v1.vodeshop.com/{{ $value }}" controls style="width: 100%;height: 350px"></video>
            @endif

            <div class="tab-pane fade in active" id="h5">
                <table class="table table-striped table-hover text-left" style="margin-top:30px">
                    <thead>
                    <tr>
                        <th class="col-md-4">Filename</th>
                        <th class="col-md-2">Size</th>
                        <th class="col-md-6">Detail</th>
                    </tr>
                    </thead>
                    <tbody id="fsUploadProgress">

                    </tbody>
                </table>
            </div>
            <input type="hidden" name="{{$name}}" id="{{$name}}-savedpath" value="{{ old($column, $value) }}">
        </div>
        @include('admin::form.help-block')
    </div>
</div>
