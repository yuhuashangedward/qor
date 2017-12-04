package resource_test

import (
	"fmt"
	"reflect"
	"testing"

	"github.com/qor/qor"
	"github.com/qor/qor/resource"
	testutils "github.com/qor/qor/test/utils"
	"github.com/qor/qor/utils"
)

func format(value interface{}) string {
	return fmt.Sprint(utils.Indirect(reflect.ValueOf(value)).Interface())
}

func checkMeta(record interface{}, meta *resource.Meta, value interface{}, t *testing.T, expectedValues ...string) {
	var (
		context       = &qor.Context{DB: testutils.TestDB()}
		metaValue     = &resource.MetaValue{Name: meta.Name, Value: value}
		expectedValue = fmt.Sprint(value)
	)

	for _, v := range expectedValues {
		expectedValue = v
	}

	meta.PreInitialize()
	meta.Initialize()

	meta.Setter(record, metaValue, context)
	if context.HasError() {
		t.Errorf("No error should happen, but got %v", context.Errors)
	}

	if result := meta.Valuer(record, context); format(result) != expectedValue {
		t.Errorf("Wrong value, should be %v, but got %v", expectedValue, format(result))
	}
}

func TestStringMetaValuerAndSetter(t *testing.T) {
	user := &struct {
		Name  string
		Name2 *string
	}{}

	res := resource.New(&user)

	meta := &resource.Meta{
		Name:         "Name",
		BaseResource: res,
	}

	checkMeta(&user, meta, "hello world", t)

	meta2 := &resource.Meta{
		Name:         "Name2",
		BaseResource: res,
	}

	checkMeta(&user, meta2, "hello world2", t)
}

func TestIntMetaValuerAndSetter(t *testing.T) {
	user := &struct {
		Age  int
		Age2 uint
		Age3 *int8
		Age4 *uint8
	}{}

	res := resource.New(&user)

	meta := &resource.Meta{
		Name:         "Age",
		BaseResource: res,
	}

	checkMeta(&user, meta, 18, t)

	meta2 := &resource.Meta{
		Name:         "Age2",
		BaseResource: res,
	}

	checkMeta(&user, meta2, "28", t)

	meta3 := &resource.Meta{
		Name:         "Age3",
		BaseResource: res,
	}

	checkMeta(&user, meta3, 38, t)

	meta4 := &resource.Meta{
		Name:         "Age4",
		BaseResource: res,
	}

	checkMeta(&user, meta4, "48", t)
}

func TestFloatMetaValuerAndSetter(t *testing.T) {
	user := &struct {
		Age  float64
		Age2 *float64
	}{}

	res := resource.New(&user)

	meta := &resource.Meta{
		Name:         "Age",
		BaseResource: res,
	}

	checkMeta(&user, meta, 18.5, t)

	meta2 := &resource.Meta{
		Name:         "Age2",
		BaseResource: res,
	}

	checkMeta(&user, meta2, "28.5", t)
}

func TestBoolMetaValuerAndSetter(t *testing.T) {
	user := &struct {
		Actived  bool
		Actived2 *bool
	}{}

	res := resource.New(&user)

	meta := &resource.Meta{
		Name:         "Actived",
		BaseResource: res,
	}

	checkMeta(&user, meta, "true", t)

	meta2 := &resource.Meta{
		Name:         "Actived2",
		BaseResource: res,
	}

	checkMeta(&user, meta2, "true", t)

	meta3 := &resource.Meta{
		Name:         "Actived",
		BaseResource: res,
	}

	checkMeta(&user, meta3, "", t, "false")

	meta4 := &resource.Meta{
		Name:         "Actived2",
		BaseResource: res,
	}

	checkMeta(&user, meta4, "f", t, "false")
}

func TestSliceMetaValuerAndSetter(t *testing.T) {
	t.Skip()

	user := &struct {
		Names  []string
		Names2 []*string
		Names3 *[]string
		Names4 []*string
	}{}

	res := resource.New(&user)

	meta := &resource.Meta{
		Name:         "Name",
		BaseResource: res,
	}

	checkMeta(&user, meta, []string{"name1", "name2"}, t)

	meta2 := &resource.Meta{
		Name:         "Name2",
		BaseResource: res,
	}

	checkMeta(&user, meta2, []string{"name1", "name2"}, t)

	meta3 := &resource.Meta{
		Name:         "Name3",
		BaseResource: res,
	}

	checkMeta(&user, meta3, []string{"name1", "name2"}, t)

	meta4 := &resource.Meta{
		Name:         "Name4",
		BaseResource: res,
	}

	checkMeta(&user, meta4, []string{"name1", "name2"}, t)
}
